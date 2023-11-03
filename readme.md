# L'informateur

Release the quacken!

## Dumb problems require over-engineered solutions

Because I can! I know, there is are much easier solution, but who cares?!

## The problem

One of my friends (for real, not imaginary) uses a crappy® Huawei™ router. And this is a router without a router! You can't bind a static local IP address to the server, but he needs it to use Octoprint. So I created this abomination!

## How to use

### Set up

Create `.env` and format it like this:

```bash
# Telegram API token.
TG_KEY="YOUR_BOT:TOKEN"
```

>Don't forget to replace it with your real bot token!

Install packages:

```bash
sudo npm -g i pm2 && npm i
```

Compile TypeScript:

```bash
npx tsc
```

Spawn the demon!

```bash
pm2 start app.config.js
```

>[Don't forget to make demon persistent!](https://pm2.keymetrics.io/docs/usage/startup/)

### Usage

After starting the bot send him `/start` and press `Became admin!` button.
>Yep, next step is a little bit manual

Copy your account entry from `candidates.json` to `admins.json`. And voila you can ask the bot about his network configuration.

### How to quack?

Send the bot `/quack` command or press `Quack!` button!
>Be aware of awkward duck!
>![Duck!](</assets/the-duck.png> "duck!")

## TODO

- Make shutdown sequence
- Redo logic of messages

## Plans for the future

- Create a service for managing multiple instances via telegram or discord bot.
- Add some more memes!
- Have fun!
  