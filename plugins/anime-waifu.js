import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix }) => {
    let res = await fetch('https://api.waifu.pics/sfw/waifu')
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw 'Error!'
    conn.sendButton(m.chat, '```Random Waifu #𝑱𝑨𝑵𝑮𝑨𝑵 𝑺𝑷𝑨𝑴```', author, json.url, [['𝒲𝒶𝒾𝒻𝓊', `${usedPrefix}waifu`]], m)
}
handler.help = ['waifu']
handler.tags = ['internet']
handler.command = /^(waifu)$/i
//MADE IN ERPAN 1140 BERKOLABORASI DENGAN BTS
export default handler
