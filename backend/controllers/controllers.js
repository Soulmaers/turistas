
const { JobUsers } = require('../modules/JobUsers')


exports.getUserCheck = async (req, res) => {
    console.log('бэк')
    const contactID = req.params.contactID
    const instance = new JobUsers(contactID)
    const user = await instance.getUser()
    res.json(user)
    /* if (user.length === 0) {
         const propsUser = await instance.addUser(username)
         return propsUser
     }
     else {*/
    //  const tournament = await instance.getTournaments(user.id)
    //   return tournament.length === 0 ? user : tournament
    //  }

}