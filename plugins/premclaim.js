const rewards = {
    exp: 10000,
    money: 900000,
    potion: 50,
    mythic: 20,
    legendary: 30
}

const cooldown = 86400000
let handler = async (m) => {
    let user = global.db.data.users[m.sender]
    if (new Date - user.lastprem < cooldown) throw `You have already claimed this Premium claim, wait for *${((user.lastprem + cooldown) - new Date()).toTimeString()}*`
    let text = ''
    for (let reward of Object.keys(rewards)) if (reward in user) {
        user[reward] += rewards[reward]
        text += `*+${rewards[reward]}* ${rpg.emoticon(reward)}${reward}\n`
    }
    conn.sendButton(m.chat,'*––––––『 PremClaim 』––––––*', text.trim(), null, [['Inventory', '.inv'], ['Menu', '.menu']],m)
    user.lastmonthly = new Date * 1
}
handler.help = ['premclaim']
handler.tags = ['premium']
handler.command = /^(premclaim)$/i

handler.premium = true

handler.cooldown = cooldown

export default handler
