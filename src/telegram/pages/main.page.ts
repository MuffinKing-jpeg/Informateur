import { Message } from 'node-telegram-bot-api'
import { MainInterface } from '../../interfaces/main.interface'
import { networkPage } from './network.page'
import { callbacks } from '../callbacks'

export function mainPage(msg: Message, main: MainInterface) {
  const isAdmin = main.db.data.admins.find((item) => item.id === msg.chat.id)
  const isWaiting = main.db.data.candidates.find(
    (item) => item.id === msg.chat.id
  )
  const isPrivate = msg.chat.type === 'private'
  networkPage(main, msg).then(() => {
    main.bot
      .sendMessage(msg.chat.id, 'How i can help you?', {
        reply_markup: {
          inline_keyboard: [
            !isAdmin
              ? isWaiting
                ? []
                : [callbacks.applyToAdmin]
              : [callbacks.updateNetwork],
            [callbacks.quack],
          ],
        },
        parse_mode: 'Markdown',
      })
      .catch((err) => console.error(err))
  })
}
