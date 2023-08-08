import dotenv from 'dotenv'
import { Client, IntentsBitField } from 'discord.js'
import { Map } from './endpoints/Map.js'
import { Ruan } from './endpoints/Ruan.js'

dotenv.config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
})

client.on('messageCreate', async (message) => {
  if (message.author.bot) return

  await Ruan(message);
  await Map(message);
})

client.login(process.env.BOT_TOKEN)