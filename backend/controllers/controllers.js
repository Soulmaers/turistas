
const { JobUsers } = require('../modules/JobUsers')


exports.addTournament = async (req, res) => {

    try {
        const instance = new JobUsers()
        const { name, startUnixTime, finishUnixTime, users, created_by } = req.body

        const tourProps = await instance.createTournament(name, startUnixTime, finishUnixTime, created_by)

        const getIdUsers = await Promise.all(users.map(async e => {
            let userReg = await instance.getUser(e.contact)
            if (!userReg) {
                userReg = (await instance.addUser(e.contact, e.name)).user
            }
            return userReg
        }))
        await Promise.all(getIdUsers.map(async el => {
            return await instance.tournamentsPartopanses(tourProps.id, el.id)
        }))
        res.json(tourProps)
    }
    catch (e) {
        console.log(e)
        res.json([])
    }
}

exports.getUserCheck = async (req, res) => {
    const { contactID, username } = req.body

    const instance = new JobUsers()

    if (!username) {
        const user = await instance.getUser(contactID)
        if (user) {
            const tournament = await instance.getTournaments(user.id)
            console.log(tournament)
            res.json({ user, tournament })
        }
        else {
            res.json(null)
        }
    }
    else {
        const propsUser = await instance.addUser(contactID, username);
        return res.json(propsUser);
    }

}


