import TelegramBot from 'node-telegram-bot-api'
import { IndexString } from '../interfaces/Index.interface'

export class DBschema implements IndexString {
  admins: TelegramBot.User[] = []
  candidates: TelegramBot.User[] = []
  config: {} = {};
  [key: string]: any
}
