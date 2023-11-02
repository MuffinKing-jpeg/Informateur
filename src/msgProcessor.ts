import { Message } from 'node-telegram-bot-api'
import { DB } from './db/db'
import { Bot } from './telegram'
import { NetworkScan } from './network'
import { NetworkButtons } from './telegram/network.buttons'
import { ApplyToAdmin } from './telegram/applyToAdmin.buttons'
import { Subscription } from 'rxjs'

type FullMessage = [Message, { type: string }]

export class MsgProcessor {
  private subscription?: Subscription
  private subscribeToText() {
    this.subscription = this.bot.textFlow.subscribe((m) => {
      const msg = m as FullMessage
      const msgText = msg[0].text
      const isAdmin = this.data.data.admins.find(() => msg[0].chat.id)
      const isPrivate = msg[0].chat.type === 'private'

      switch (msgText) {
        case '/start':
          if (isAdmin && isPrivate) {
            this.bot.bot.sendMessage(
              msg[0].chat.id,
              `Hey, i hope you have a lovely day.
              Here is some info about me:
              \`\`\`
              Hostname: ${this.network.hostname}
              \`\`\`javascript
              ${JSON.stringify(this.network.interfaces, null, 4)}
              \`\`\`
              `,
              { reply_markup: NetworkButtons }
            )
          } else
            this.bot.bot.sendMessage(
              msg[0].chat.id,
              `Hey, dude, sorry, but you are not admin.`,
              { reply_markup: ApplyToAdmin }
            )
          break
        case '':
          break

        default:
          break
      }
    })
  }

  private data: DB
  private bot: Bot
  private network: NetworkScan
  constructor(db: DB, tg: Bot, net: NetworkScan) {
    this.data = db
    this.bot = tg
    this.network = net
    this.subscribeToText()
  }
}
