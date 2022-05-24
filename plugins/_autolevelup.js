import { canLevelUp } from '../lib/levelling.js'
export function before(m) {
    let user = global.db.data.users[m.sender]
    if (!user.autolevelup)
        return !0
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier))
        user.level++

    if (before !== user.level) {
        m.reply(`
───────── ∙ ~εïз~ ∙ ─────────
|Selamat, anda telah naik level!
| Sebelum:*${before}*
| Sesudah: *${user.level}*
| gunakan *.profile* untuk mengecek
          R U L L  B O T
───────── ∙ ~εïз~ ∙ ─────────
	`.trim())
    }
}
export const disabled = false
