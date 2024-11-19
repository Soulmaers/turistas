
const { JobUsers } = require('../modules/JobUsers')


exports.getUserCheck = async (req, res) => {
    const contactID = req.body.contactID
    const username = req.body.username
    const instance = new JobUsers(contactID)
    const user = await instance.getUser()

    if (user.length === 0) {
        const propsUser = await instance.addUser(username)
        return propsUser
    }
    else {
        const tournament = await instance.getTournaments(user.id)
        return tournament.length === 0 ? user : tournament
    }

}