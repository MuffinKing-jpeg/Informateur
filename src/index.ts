import { config } from 'dotenv'
import { NetworkScan } from './network.js'
import { DB } from './db/db.js'
import { Bot } from './telegram.js'
import { MsgProcessor } from './msgProcessor.js'

// Initialization
console.time('Total init time')

// Loading .env

console.time('.env load time')
console.log('Loading .env file')
config()
if (process.env['DEV']) console.log('Loaded in dev mode!')
console.timeEnd('.env load time')

// Load network
console.time('Network init time')
console.log('Loading network interfaces data.')
const network = new NetworkScan()
console.timeEnd('Network init time')

// Init DB
console.time('DB init time')
const db = new DB()

db.initDB()
  .then(() => {
    console.timeEnd('DB init time')
    console.log(db.data)
    const bot = new Bot(process.env['TG_KEY'] ?? '')
    const msgProcessor = new MsgProcessor(db, bot, network)
  })
  .then(() => {
    console.timeEnd('Total init time')
  })
  .catch((err) => {
    console.error('OOOOPSIE, SOMETHING GOES WRONG!!!', err)
  })

/*
 * Decoy to keep process alive
 */
setInterval(() => {}, 100)
