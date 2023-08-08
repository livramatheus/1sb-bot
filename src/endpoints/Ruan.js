export function Ruan(message) {
  if (message.content === 'ruan') {
    const alias = [
      'Menino Pomarola',
      'Menino Tonolli',
      'Bumbum granada',
      'Brito Junior',
      'Carlinhos',
      'Ruão',
      'Big Street (tradução direta para o inglês)',
      'Bronzordia',
      'Bumbum King Size',
      'Aruan (com meio r)',
      'Joribaldo',
      'Filho do Brito da Celesc',
      'Omae wa mo shindeiru Joribaldo (tradução direta para o japonês)',
      'Baruan ou ruan arombadinho',
      'Cabrito',
      'Polentão',
      'Arnaldo dedo sujo (ADS)',
      'Supremo senhor líder do squad',
      'Barroso ou Ministro do STF'
    ]

    return message.reply('Ruan? Você quis dizer ' + alias[parseInt(Math.random() * (alias.length + 1))])
  }
}