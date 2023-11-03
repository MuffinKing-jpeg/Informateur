import TelegramBot from 'node-telegram-bot-api'
import { MainInterface } from '../../interfaces/main.interface'
import { mainPage } from './main.page'

export function applyToAdminPage(
  main: MainInterface,
  callback: TelegramBot.CallbackQuery
) {
  if (
    main.db.data.admins.find((item) => item.id === callback.from.id) ||
    main.db.data.candidates.find((item) => item.id === callback.from.id)
  ) {
    if (callback.message) {
      main.bot
        .sendMessage(
          callback.message.chat.id,
          'You are already admin or in a wait list'
        )
        .then(() => {
          if (callback.message) mainPage(callback.message, main)
        })
    }
  } else {
    if (callback.message) {
      if (callback.message?.chat.type === 'private') {
        main.db.data.candidates.push(callback.from)
        main.db.save()
        main.bot.sendMessage(
          callback.message?.chat.id,
          'Applied to admin, wait for verification'
        )
        mainPage(callback.message, main)
      } else {
      }
    }
  }
}
