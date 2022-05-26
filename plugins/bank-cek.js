let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  const caption = `
▧「 *𝐁 𝐀 𝐍 𝐊  𝐔 𝐒 𝐄 𝐑* 」
│ 📛 *𝙽𝚊𝚖𝚊:* ${user.registered ? user.name : conn.getName(m.sender)}
│ 💳 *𝙰𝚝𝚖:* ${user.atm > 0 ? 'Level ' + user.atm : '✖️'}
│ 🏛️ *𝙱𝚊𝚗𝚔:* ${user.bank} 💲 / ${user.fullatm} 💲
│ 💹 *𝚄𝚊𝚗𝚐:* ${user.money} 💲
│ 🤖 *𝚁𝚘𝚋𝚘:* ${user.robo > 0 ? 'Level ' + user.robo : '✖️'}
│ 🌟 *𝚂𝚝𝚊𝚝𝚞𝚜:* ${user.premiumTime > 0 ? 'Premium' : 'Free'}
│ 📑 *𝚃𝚎𝚛𝚍𝚊𝚏𝚝𝚊𝚛:* ${user.registered ? 'Yes':'No'}
└──···
`.trim()
  conn.sendButton(m.chat, caption, author, 'https://telegra.ph/file/0451b07945f7f9633b59b.jpg', [`Inventory`, '.inv'],m)
}
handler.help = ['bank']
handler.tags = ['rpg']
handler.command = /^(bank)$/i

handler.register = false
export default handler
