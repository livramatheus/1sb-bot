import { EmbedBuilder } from 'discord.js'
import { formatDistanceToNow } from 'date-fns'
import fetch from 'node-fetch'
import ptBR from 'date-fns/locale/pt-BR/index.js'

const convertItemName = (item) => {
  return item
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase())
}

export async function Crafting(message) {
  if (['crafting', 'crafter'].includes(message.content)) {
    const response = await fetch(
      `https://api.mozambiquehe.re/crafting?auth=${process.env.APEX_TOKEN}&version=2`,
    )

    if (response.status === 200) {
      const crafting = await response.json()
      const embedReply = new EmbedBuilder()
      const ignorePermItems = ['evo_armor', 'ammo']
      const durationString = formatDistanceToNow(
        new Date(crafting[0].end * 1000),
        { addSuffix: true, locale: ptBR },
      )

      embedReply.setColor(0x0000ff)
      embedReply.setTitle('Itens do Crafter')
      embedReply.setDescription(
        'Os itens diários do crafter irão trocar ' + durationString,
      )

      const daily = crafting.filter((item) => {
        return item.bundleType === 'daily'
      })
      const weekly = crafting.filter((item) => {
        return item.bundleType === 'weekly'
      })
      const permanent = crafting.filter((item) => {
        return item.bundleType === 'permanent'
      })

      embedReply.addFields({
        name: '⏱ Itens Diários',
        value: ' ',
      })

      daily.forEach((i) => {
        i.bundleContent.forEach((item) => {
          embedReply.addFields({
            name: `${item.itemType.rarity} ${convertItemName(
              item.itemType.name,
            )}`,
            value: item.cost + ' materials',
            inline: true,
          })
        })
      })

      embedReply.addFields({
        name: '📅 Itens Semanais',
        value: ' ',
      })

      weekly.forEach((i) => {
        i.bundleContent.forEach((item) => {
          embedReply.addFields({
            name: `${item.itemType.rarity} ${convertItemName(
              item.itemType.name,
            )}`,
            value: item.cost + ' materials',
            inline: true,
          })
        })
      })

      embedReply.addFields({
        name: '🔫 Itens Permanentes',
        value: ' ',
      })

      permanent.forEach((i) => {
        i.bundleContent.forEach((item) => {
          if (ignorePermItems.includes(item.itemType.name)) return

          embedReply.addFields({
            name: convertItemName(item.itemType.name),
            value: item.cost + ' materials',
            inline: true,
          })
        })
      })

      return message.reply({ embeds: [embedReply] })
    }

    return message.reply('Something went wrong. Try again later')
  }
}
