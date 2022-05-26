const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isGroupLink = linkRegex.exec(m.text)

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return !0
        }
        await conn.sendButton(m.chat, `*𝘓𝘪𝘯𝘬 𝘎𝘳𝘶𝘣 𝘛𝘦𝘳𝘥𝘦𝘵𝘦𝘬𝘴𝘪!*${isBotAdmin ? '' : '\n\n𝘉𝘰𝘵 𝘛𝘪𝘥𝘢𝘬 𝘈𝘥𝘮𝘪𝘯'}`, author, ['𝘖𝘧𝘧 𝘈𝘯𝘵𝘪𝘭𝘪𝘯𝘬', '/disable antilink'], m)
        if (isBotAdmin && bot.restrict) {
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        } else if (!bot.restrict) return m.reply('Owner disable auto kick!')
    }
    return !0
}
