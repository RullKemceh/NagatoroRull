import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Use example ${usedPrefix}${command} Minecraft`
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'Video/Audio Tidak ditemukan'
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
  const url = 'https://www.youtube.com/watch?v=' + videoId
  await conn.sendHydrated(m.chat, `
📌 *Judul:* ${title}
🔗 *Sumber:* ${url}
🖹 *Deskripsi:* ${description}
⏲️ *Tanggal Upload:* ${publishedTime}
⌚ *Durasi:* ${durationH}
👁️ *Penonton:* ${viewH}
*Jangan Spam Yaa*
  `.trim(), author, thumbnail, url, '𝙆𝙚 𝙔𝙤𝙪𝙩𝙪𝙗𝙚!', null, null, [
    ['𝘼𝙪𝙙𝙞𝙤/𝙈𝙪𝙨𝙞𝙠', `${usedPrefix}yta ${url} yes`], 
    ['𝙑𝙞𝙙𝙚𝙤', `${usedPrefix}ytv ${url} yes`],
    ['Gajadi', `${usedPrefix}del`]
  ], m)
}
handler.help = ['play', 'play2'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^play2?$/i

handler.exp = 0
handler.limit = 3

export default handler

