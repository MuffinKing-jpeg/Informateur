const env = require('dotenv')

env.config()

const isDev = !!process.env['DEV']

console.log('Dev mode:', isDev)

module.exports = {
  apps: [
    {
      name: "L'informateur",
      script: './lib/index.js',
      watch: isDev,
      // Delay between restart
      watch_delay: 50,
      ignore_watch: ['node_modules', '\\.git', '*.log', '.vscode', 'database'],
    },
  ],
}
