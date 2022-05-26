let { MessageType } = (await import('@adiwajshing/baileys')).default

let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
  let type = (args[0] || '').toLowerCase()
  let _type = (args[0] || '').toLowerCase()
  let user = global.db.data.users[m.sender]
  global.db.data.users[m.sender].pickaxe = global.db.data.users[m.sender].pickaxe || 0
  global.db.data.users[m.sender].sword = global.db.data.users[m.sender].sword || 0
  global.db.data.users[m.sender].fishingrod = global.db.data.users[m.sender].fishingrod || 0
  
  //----------HARGA
  let hdog = 2
  let hcat = 3
  let hhorse = 5
  let hfox = 10
  let hrobo = 20

let logo = `— *𝗣 𝗘 𝗧  𝗦 𝗛 𝗢 𝗣* —
▮▧▧▧▧▧▧▧▧▧▧▧▧▮`
let caption = `
🐈 *𝖢𝖺𝗋:* ${hcat} 🔖
🐕 *𝖣𝗈𝗀:* ${hdog} 🔖
🐎 *𝖧𝗈𝗋𝗌𝖾:* ${hhorse} 🔖
🦊 *𝖥𝗈𝗓:* ${hfox} 🔖
🤖 *𝖱𝗈𝖻𝗈:* ${hrobo} 🔖

`
const sections = [
   {
	title: "Buy A Pet",
	rows: [
	    {title: "Cat 🐈", rowId: ".petshop cat", description: "𝐴𝑑𝑜𝑝𝑠𝑖 𝐾𝑢𝑐𝑖𝑛𝑔"},
	    {title: "Dog 🐕", rowId: ".petshop dog", description: "𝐴𝑑𝑜𝑝𝑠𝑖 𝐴𝑛𝑗𝑖𝑛𝑔"},
	    {title: "Horse 🐎", rowId: ".petshop horse", description: "𝐴𝑑𝑜𝑝𝑠𝑖 𝐾𝑢𝑑𝑎"},
	    {title: "Fox 🦊", rowId: ".petshop fox", description: "𝐴𝑑𝑜𝑝𝑠𝑖 𝑅𝑢𝑏𝑎ℎ"},
	    {title: "Robo 🤖", rowId: ".petshop robo", description: "𝐴𝑑𝑜𝑝𝑠𝑖 𝑅𝑜𝑏𝑜"},
	]
    },
]

const listMessage = {
  text: caption,
  footer: author,
  title: logo,
  buttonText: "𝐴𝐷𝑂𝑃𝑆𝐼 :𝐷",
  sections
}

  try {
    if (/petshop/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
        switch (type) {
          case 'cat':
          if (user.cat > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hcat) return m.reply(`Pet Token anda kurang`)
            global.db.data.users[m.sender].pet -= hcat
            global.db.data.users[m.sender].cat += 1
            m.reply("𝑆𝑒𝑙𝑎𝑚𝑎𝑡 𝐾𝑎𝑚𝑢 𝑃𝑢𝑛𝑦𝑎 𝑃𝑒𝑡 𝐵𝑎𝑟𝑢 ! 🎉")
            break
          case 'dog':
          if (user.dog > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hdog) return m.reply(`Pet Token anda kurang`)
            global.db.data.users[m.sender].pet -= hdog
            global.db.data.users[m.sender].dog += 1
            m.reply("𝑆𝑒𝑙𝑎𝑚𝑎𝑡 𝐾𝑎𝑚𝑢 𝑀𝑒𝑚𝑝𝑢𝑛𝑦𝑎𝑖 𝑃𝑒𝑡 𝐵𝑎𝑟𝑢 ! 🎉")
            break
          case 'fox':
          if (user.fox > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hfox) return m.reply(`Pet Token anda kurang`)
            global.db.data.users[m.sender].pet -= hfox
            global.db.data.users[m.sender].fox += 1
            m.reply("𝑆𝑒𝑙𝑎𝑚𝑎𝑡 𝐾𝑎𝑚𝑢 𝑀𝑒𝑚𝑝𝑢𝑛𝑦𝑎𝑖 𝑃𝑒𝑡 𝐵𝑎𝑟𝑢 ! 🎉")
            break
          case 'horse':
          if (user.horse > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hhorse) return m.reply(`Pet Token anda kurang`)
            global.db.data.users[m.sender].pet -= hhorse
            global.db.data.users[m.sender].horse += 1
            m.reply("𝑆𝑒𝑙𝑎𝑚𝑎𝑡 𝐾𝑎𝑚𝑢 𝑃𝑒𝑚𝑝𝑢𝑛𝑦𝑎𝑖 𝑃𝑒𝑡 𝐵𝑎𝑟𝑢 ! 🎉")
            break
          case 'robo':
          if (user.robo > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hrobo) return m.reply(`Pet Token anda kurang`)
            global.db.data.users[m.sender].pet -= hrobo
            global.db.data.users[m.sender].robo += 1
            m.reply("𝑆𝑒𝑙𝑎𝑚𝑎𝑡 𝐾𝑎𝑚𝑢 𝑀𝑒𝑚𝑝𝑢𝑛𝑦𝑎𝑖 𝑃𝑒𝑡 𝐵𝑎𝑟𝑢 ! 🎉")
            break
            
          default:
            return await conn.sendMessage(m.chat, listMessage)
        }
    } else if (/enchant|enchan/i.test(command)) {
      const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
      switch (_type) {
        case 't':
          break
        case '':
          break

        default:
          return conn.sendButton( m.chat, caption, author, null, [`⋮☰ Menu`, `.menu`], m)
      }
    }
  } catch (err) {
    m.reply("Error\n\n\n" + err.stack)
  }
}

handler.help = ['petshop']
handler.tags = ['rpg']
handler.command = /^(petshop)/i

export default handler
