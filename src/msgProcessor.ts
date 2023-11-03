import { commands } from './telegram/commands'
import { sendDuck } from './telegram/duckSender'
import { MainInterface } from './interfaces/main.interface'
import { mainPage } from './telegram/pages/main.page'

export function listenText(main: MainInterface) {
  main.bot.on('text', (msg) => {
    const msgText = msg.text
    const isAdmin = main.db.data.admins.find((item) => item.id === msg.chat.id)
    const isPrivate = msg.chat.type === 'private'
    switch (msgText) {
      case commands.start.command:
        mainPage(msg, main)
        break
      case commands.quack.command:
        main.bot
          .sendMessage(msg.chat.id, 'Quack-quack, madafaka!')
          .then(() =>
            sendDuck(main.bot, msg.chat.id).then(() => mainPage(msg, main))
          )

        break
      default:
        break
    }
  })
}
