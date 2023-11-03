import { MainInterface } from './interfaces/main.interface'
import { callbacks } from './telegram/callbacks'
import { sendDuck } from './telegram/duckSender'
import { applyToAdminPage } from './telegram/pages/applyToAdmin.page'
import { mainPage } from './telegram/pages/main.page'

export function listenEvent(main: MainInterface) {
  main.bot.on('callback_query', (callback) => {
    if (callback.message)
      switch (callback.data) {
        case callbacks.applyToAdmin.callback_data:
          applyToAdminPage(main, callback)
          break
        case callbacks.quack.callback_data:
          sendDuck(main.bot, callback.message?.chat.id).then(() => {
            if (callback.message) mainPage(callback.message, main)
          })
          break
        case callbacks.updateNetwork.callback_data:
          main.net.updateNetwork()
          mainPage(callback.message, main)
          break
        default:
          break
      }
  })
}
