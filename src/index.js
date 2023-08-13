import dotenv from 'dotenv'
import { Client, IntentsBitField } from 'discord.js'
import { Map } from './endpoints/Map.js'
import { Ruan } from './endpoints/Ruan.js'
import { Crafting } from './endpoints/Crafting.js'

dotenv.config()

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
})

client.on('ready', () => {
  console.log('🥇 Bot Online')
})

client.on('messageCreate', async (message) => {
  if (message.author.bot) return

  await Ruan(message)
  await Map(message)
  await Crafting(message)
})

client.login(process.env.BOT_TOKEN)
