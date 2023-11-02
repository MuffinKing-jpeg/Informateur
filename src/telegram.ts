import TelegramBot, { Message } from 'node-telegram-bot-api'
import { Observable, filter, fromEvent } from 'rxjs'

export class Bot {
  public readonly bot: TelegramBot

  /**
   * msgFlow
   */
  public textFlow: Observable<unknown>
  public callbackFlow: Observable<unknown>

  constructor(key: string) {
    this.bot = new TelegramBot(key, { polling: true })
    this.textFlow = fromEvent(this.bot, 'text')
    this.callbackFlow = fromEvent(this.bot, 'callback_query')
    this.bot.on('callback_query', (msg) => {
      console.log(msg)
    })
  }
}
