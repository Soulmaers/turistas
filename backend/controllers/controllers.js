
const { JobUsers } = require('../modules/JobUsers')


exports.getUserCheck = async (req, res) => {
    const { contactID, username } = req.body

    const instance = new JobUsers(contactID)

    if (!username) {
        const user = await instance.getUser()
        if (user) {
            const tournament = await instance.getTournaments(user.id)
            res.json({ user, tournament })
        }
        else {
            res.json(null)
        }
    }
    else {
        const propsUser = await instance.addUser(username);
        return res.json(propsUser);
    }





}