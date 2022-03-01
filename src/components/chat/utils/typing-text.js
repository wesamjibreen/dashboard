export default (room, currentUserId, textMessages) => {

	if (room.typingUsers && room.typingUsers.length) {
        // console.log('typingUsers B' , room.typingUsers)
		const typingUsers = room.typingUsers.filter(user => {
            // console.log('user 2' , user , currentUserId)
            return user !== currentUserId
			// if (room.typingUsers.indexOf(user._id) === -1) return
			// if (user.status && user.status.state === 'offline') return
			// return true


		})


		if (!typingUsers.length) return

		if (room.users.length === 2) {
			return textMessages.IS_TYPING
		} else {
			return 	textMessages.IS_TYPING
		}
	}
}
