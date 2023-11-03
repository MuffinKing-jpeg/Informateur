import TelegramBot from 'node-telegram-bot-api'

export const commands = {
  start: {
    command: '/start',
    description: 'Release the beast',
  },
  quack: {
    command: '/quack',
    description: 'Quack',
  },
}
