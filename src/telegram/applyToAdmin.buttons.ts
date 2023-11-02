import { InlineKeyboardMarkup } from 'node-telegram-bot-api'

export const ApplyToAdmin: InlineKeyboardMarkup = {
  inline_keyboard: [
    [{ text: 'Became admin!', callback_data: 'apply_to_admin' }],
  ],
}
