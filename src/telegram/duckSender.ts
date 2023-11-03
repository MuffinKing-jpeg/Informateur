import TelegramBot from 'node-telegram-bot-api'

/**
 * sendDuck
 *
 * Sends duck *quack-quack*
 */
export function sendDuck(bot: TelegramBot, chatId: number) {
  return new Promise<void>((res) => {
    bot
      .sendSticker(
        chatId,
        'CAACAgIAAxkBAAMxZUPaO1YL43svShaXkCc1H7HtHdQAAgsAA8i6ORxOrMJs4npP2TME'
      )
      .then(() => res())
  })
}
