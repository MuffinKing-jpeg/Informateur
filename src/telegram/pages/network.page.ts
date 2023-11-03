import TelegramBot from 'node-telegram-bot-api'
import { MainInterface } from '../../interfaces/main.interface'

export function networkPage(main: MainInterface, msg: TelegramBot.Message) {
  return new Promise<void>((resolve) => {
    if (main.db.data.admins.find((item) => item.id === msg.chat.id)) {
      if (msg.chat.type === 'private') {
        main.bot
          .sendMessage(
            msg.chat.id,
            ` Hostname: \`${
              main.net.hostname
            }\`\n\`\`\`javascript\n${JSON.stringify(
              main.net.interfaces,
              null,
              4
            )}\n\`\`\``,
            {
              parse_mode: 'Markdown',
            }
          )
          .then(() => resolve())
      }
    } else {
      resolve()
    }
  })
}
