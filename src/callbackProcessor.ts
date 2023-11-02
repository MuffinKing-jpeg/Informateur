import { Subscription } from 'rxjs'
import { DB } from './db/db'
import { NetworkScan } from './network'
import { Bot } from './telegram'

export class CallbackProcessor {
  private subscription?: Subscription
  private subscribeToCallback() {
    this.subscription = this.bot.callbackFlow.subscribe((e) => {
      console.log(e)
    })
  }

  private data: DB
  private bot: Bot
  private network: NetworkScan
  constructor(db: DB, tg: Bot, net: NetworkScan) {
    this.data = db
    this.bot = tg
    this.network = net
    this.subscribeToCallback()
  }
}
