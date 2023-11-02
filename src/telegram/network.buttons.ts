import { InlineKeyboardMarkup } from 'node-telegram-bot-api'

export const NetworkButtons: InlineKeyboardMarkup = {
  inline_keyboard: [
    [{ text: 'Update network', callback_data: 'update_network' }],
  ],
}
