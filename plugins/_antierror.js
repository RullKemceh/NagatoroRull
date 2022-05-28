let handler = m => m

handler.all = async function(m, {conn} ) {
	let user = global.db.data.users[m.sender]
	if ((user.money * 1) > 999999998) {
		user.money = 999999999
	} else if ((user.money * 1) < 0) {
		user.money = 0
	}
	if ((user.exp * 1) > 999999998) {
		user.exp = 999999999
	} else if ((user.exp * 1) < 0) {
		user.exp = 0
	}
	if ((user.health * 1) > 100) {
		user.health = 100
	} else if ((user.health * 1) < 0) {
		user.health = 0
	}
}

export default handler
