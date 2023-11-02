import { mkdir, readFile, readdir, writeFile } from 'fs/promises'
import { DBschema } from './db.schema'
import { Subject, BehaviorSubject } from 'rxjs'

export class DB {
  /**
   * data
   *
   * Contains db data
   */
  public readonly data = new DBschema()

  private saveQuery = new Subject()

  private canSave = new BehaviorSubject(true)

  private writeAll() {
    return new Promise<void>((resolve, reject) => {
      const execQuery: Promise<void>[] = []
      const dbKeys = Object.keys(this.data)
      for (let i = 0; i < dbKeys.length; i++) {
        execQuery.push(this.dataSaver(dbKeys[i]))
      }
      Promise.all(execQuery)
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  }

  private writerSubscribe() {
    this.saveQuery.subscribe((signal) => {
      if (this.canSave.value) {
        this.canSave.next(false)
        this.writeAll()
          .then(() => this.canSave.next(true))
          .catch((err) => console.error(err))
      } else {
        const subscription = this.canSave.subscribe((v) => {
          if (v) {
            this.canSave.next(false)
            this.writeAll()
              .then(() => {
                subscription.unsubscribe()
                this.canSave.next(true)
              })
              .catch((err) => console.error(err))
          }
        })
      }
    })
  }

  /**
   * save
   *
   * Saves data from memory to disk
   */
  public save() {
    this.saveQuery.next('save')
  }

  private dataSaver(dbKey: string) {
    return new Promise<void>((res, rej) => {
      writeFile(
        './database/' + dbKey + '.json',
        JSON.stringify(this.data[dbKey])
      )
        .then(() => res())
        .catch((err) => rej(err))
    })
  }

  private readFiles(filesList: string[]) {
    return new Promise<void>((resolve, reject) => {
      const dbKeys = Object.keys(this.data)
      const execQuery: Promise<void>[] = []
      for (let i = 0; i < dbKeys.length; i++) {
        const search = filesList.find((elem) => {
          return elem === dbKeys[i] + '.json'
        })

        if (search) {
          console.log('Found', dbKeys[i] + '.json')
          execQuery.push(
            new Promise<void>((res, rej) => {
              readFile('./database/' + dbKeys[i] + '.json')
                .then((data) => {
                  const json = JSON.parse(data.toString('utf-8'))
                  this.data[dbKeys[i]] = json
                  res()
                })
                .catch((err) => rej(err))
            })
          )
        } else {
          console.log(`Not found ${dbKeys[i]}.json. Creating...`)

          execQuery.push(this.dataSaver(dbKeys[i]))
        }
      }

      Promise.all(execQuery)
        .then(() => resolve())
        .catch((err) => {
          reject(err)
        })
    })
  }

  private createFolder() {
    return new Promise((resolve, reject) => {
      mkdir('./database')
        .then((dir) => {
          resolve(dir)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  /**
   * initDB
   *
   * Initialize database
   */
  public initDB(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      readdir('./database')
        .then((res) => {
          this.readFiles(res).then(() => {
            this.writerSubscribe()
            resolve()
          })
        })
        .catch((err) => {
          if (err['code'] && err['code'] === 'ENOENT') {
            console.log('No database directory', "Creating './database'...")
            this.createFolder()
              .then(() => {
                this.initDB()
              })
              .catch((err) => {
                reject(err)
              })
          } else {
            console.error(err)
          }
        })
    })
  }

  constructor() {}
}
