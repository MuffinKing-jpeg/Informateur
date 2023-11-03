import { config } from 'dotenv'
import { NetworkScan } from './network.js'
import { DB } from './db/db.js'
import { listenText } from './msgProcessor.js'
import TelegramBot from 'node-telegram-bot-api'
import { sendDuck } from './telegram/duckSender.js'
import { commands } from './telegram/commands.js'
import { MainInterface } from './interfaces/main.interface.js'
import { listenEvent } from './callbackProcessor.js'

// Initialization
console.time('Total init time')

// Loading .env

console.time('.env load time')
console.log('Loading .env file')
config()
if (process.env['DEV']) console.log('Loaded in dev mode!')
console.timeEnd('.env load time')

// Load network
console.time('Network init time')
console.log('Loading network interfaces data.')
const network = new NetworkScan()
console.timeEnd('Network init time')

// Init DB
console.time('DB init time')
const db = new DB()

db.initDB()
  .then(() => {
    console.timeEnd('DB init time')
    const bot = new TelegramBot(process.env['TG_KEY'] ?? '', { polling: true })
    const main: MainInterface = {
      bot: bot,
      db: db,
      net: network,
    }
    console.log(db.data)

    bot.setMyCommands([commands.start, commands.quack])

    listenText(main)
    listenEvent(main)
  })
  .then(() => {
    console.timeEnd('Total init time')
  })
  .catch((err) => {
    console.error('OOOOPSIE, SOMETHING WENT WRONG!!!', err)
  })

/*
 * Decoy to keep process alive
 */
setInterval(() => {}, 100)
