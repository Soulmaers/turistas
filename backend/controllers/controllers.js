
const { JobUsers } = require('../modules/JobUsers')


exports.getUserCheck = async (req, res) => {
    console.log('бэк')
    console.log(req.body)
    const contactID = req.body.contactID
    const username = req.body.username
    console.log(contactID, username)
    const instance = new JobUsers(contactID)
    const user = await instance.getUser()

    // Если пользователя нет и не передано имя
    if (!user) {
        if (!username) {
            return res.json(null); // Возвращаем пустой массив
        }
        // Если имя передано, добавляем пользователя
        const propsUser = await instance.addUser(username);
        return res.json(propsUser); // Возвращаем свойства нового пользователя
    } else {
        // Если пользователь найден, возвращаем его свойства
        return res.json(user);
    }
    //  else {
    //  const tournament = await instance.getTournaments(user.id)
    //   return tournament.length === 0 ? user : tournament
    //  }



}