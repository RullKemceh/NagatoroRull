import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
let tags = {
  'main': '𝘔𝘢𝘪𝘯 𝘔𝘦𝘯𝘶',
  'game': '𝘎𝘢𝘮𝘦',
  'rpg': '𝘙𝘗𝘎 𝘎𝘢𝘮𝘦𝘴',
  'xp': '𝘌𝘹𝘱 𝘋𝘢𝘯 𝘓𝘪𝘮𝘪𝘵',
  'sticker': '𝘚𝘵𝘪𝘬𝘦𝘳',
  'kerang': '𝘒𝘦𝘳𝘢𝘯𝘨 𝘈𝘫𝘢𝘪𝘣',
  'quotes': '𝘘𝘶𝘰𝘵𝘦𝘴',
  'admin': '𝘈𝘥𝘮𝘪𝘯',
  'group': '𝘎𝘳𝘰𝘶𝘱',
  'internet': '𝘐𝘯𝘵𝘦𝘳𝘯𝘦𝘵',
  'anonymous': '𝘈𝘯𝘰𝘯𝘺𝘮𝘰𝘶𝘴 𝘊𝘩𝘢𝘵',
  'nulis': '𝘔𝘢𝘨𝘦𝘳 𝘕𝘶𝘭𝘪𝘴',
  'downloader': '𝘋𝘰𝘸𝘯𝘭𝘰𝘢𝘥𝘦𝘳',
  'tools': '𝘛𝘰𝘰𝘭𝘴',
  'canvas': '𝘊𝘢𝘯𝘷𝘢𝘴',
  'fun': '𝘍𝘶𝘯',
  'database': '𝘋𝘢𝘵𝘢𝘣𝘢𝘴𝘦',
  'quran': '𝘈𝘭 𝘘𝘶𝘳\'𝘈𝘯',
  'owner': '𝘖𝘸𝘯𝘦𝘳',
  'maker': '𝘔𝘢𝘬𝘦𝘳',
  'advanced': '𝘈𝘥𝘷𝘢𝘯𝘤𝘦𝘥',
  'audio': '𝘈𝘶𝘥𝘪𝘰', 
  'premium': '𝘗𝘳𝘦𝘮𝘪𝘶𝘮', 
  'info': '𝘐𝘯𝘧𝘰'
  'jadian': 'jadian'

}
const defaultMenu = {
  before: `╭───── 「 %me 」
|
| Nama:%name
|
| Waktu: %time
|
| Exp: %totalexp
|
| Role: %role
|
| Database: %rtotalreg of %totalreg
|
| Uptime:
| %uptime
| (%muptime)
|
| Nagatoro✨
|
| Note: Jika Hint Game Gak Muncul Mohon
| Tulis Lagi :D
|
╰ 🌸

`.trimStart(),
  header: '```✦ ╮ %category```',
  body: '```»»--► %cmd %islimit %isPremium```',
  after: ``,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({})))
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
    conn.sendHydrated(m.chat, text.trim(), author, thumbmenu, sig, 'Instagram', `+6285859047172`, 'Number Owner', [
      ['𝐃𝐨𝐧𝐚𝐭𝐞', '/donasi'],
      ['𝐒𝐩𝐞𝐞𝐝', '/ping'],
      ['𝐂𝐫𝐞𝐚𝐭𝐨𝐫', '/owner']
    ], m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i

handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
