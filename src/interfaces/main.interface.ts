import TelegramBot from 'node-telegram-bot-api'
import { DB } from '../db/db'
import { NetworkScan } from '../network'

export interface MainInterface {
  bot: TelegramBot
  db: DB
  net: NetworkScan
}
