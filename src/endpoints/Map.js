import { EmbedBuilder} from 'discord.js'
import { format, formatDistanceToNow } from 'date-fns'
import fetch from 'node-fetch';
import ptBR from 'date-fns/locale/pt-BR/index.js';

export async function Map(message) {
  if (['mapa', 'rotation'].includes(message.content)) {
    const response = await fetch(
      `https://api.mozambiquehe.re/maprotation?auth=${process.env.APEX_TOKEN}&version=2`,
    )
    
    if (response.status === 200) {
      const mapRotation = await response.json()
      const embedReply = new EmbedBuilder();

      const durationString = formatDistanceToNow(
        new Date(mapRotation.ranked.current.end * 1000),
        { addSuffix: true, locale: ptBR }
      );

      embedReply.setColor(0xFFFF00)
      embedReply.setTitle('Mapa atual: ' + mapRotation.ranked.current.map)
      embedReply.setDescription('Próximo mapa: ' + mapRotation.ranked.next.map + '. Rotação irá ocorrer ' + durationString + '.')
      embedReply.addFields(
        {
          name: 'Hora da troca de mapas',
          value: format(
            mapRotation.ranked.current.end * 1000,
            'dd/MM/yyyy HH:mm:ss'
          )
        }
      )
      embedReply.setImage(mapRotation.ranked.current.asset)
      
      return message.reply({ embeds: [embedReply] })
    }

    return message.reply('Something went wrong. Try again later')
  }
}
