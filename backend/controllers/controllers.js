
const { JobUsers } = require('../modules/JobUsers')
const { GetContent } = require('../modules/GetContent')
const { ProcessCatch } = require('../modules/ProcessCatch')

exports.addTournament = async (req, res) => {

    try {
        const instance = new JobUsers()
        const { idTour, name, startUnixTime, finishUnixTime, users, created_by } = req.body
        const tourProps = await instance.createTournament(idTour, name, startUnixTime, finishUnixTime, created_by)

        const getIdUsers = await Promise.all(users.map(async e => {
            let userReg = await instance.getUser(e.contactID)
            if (!userReg) {
                userReg = (await instance.addUser(e.contactID, e.name_user)).user
            }
            return userReg
        }))
        await Promise.all(getIdUsers.map(async el => {
            return await instance.tournamentsParticipants(tourProps.id, el.id)
        }))
        res.json(tourProps)
    }
    catch (e) {
        console.log(e)
        res.json([])
    }
}

exports.getContent = async (req, res) => {
    const [reservours, fishs, baits, timeDay, typeCatch] = await Promise.all([
        GetContent.getReservours(),
        GetContent.getFishs(),
        GetContent.getBaits(),
        GetContent.getTimeDay(),
        GetContent.getTypeCatch()])
    res.json({ reservours, fishs, baits, timeDay, typeCatch })
}
exports.getStatusUser = async (req, res) => {
    const id = req.body.id
    const result = await ProcessCatch.getStatusUser(id)
    res.json(result)
}


exports.setCatch = async (req, res) => {
    const data = req.body.data
    data.date = Math.floor((new Date().getTime()) / 1000)
    const [result, ok] = await Promise.all([ProcessCatch.setCatch(data), ProcessCatch.updateUserStatus(data)])
    ok ? res.json(result) : res.json('Что-то пошло не так при обновлении статуса пользователя')
}

exports.getCatchs = async (req, res) => {
    const idTour = req.body.idTour
    const result = await ProcessCatch.getCatchs(idTour)
    const fishCategories = ["Лещ", "Щука", "Судак", "Окунь", "Форель", "Другое", "Всего"];

    const data = [];

    result.forEach(item => {
        const { name_user, name } = item;
        const fishType = fishCategories.includes(name) ? name : "Другое";

        let userEntry = data.find(entry => entry.name_user === name_user);

        if (!userEntry) {
            userEntry = {
                name_user: name_user,
                "Лещ": 0,
                "Щука": 0,
                "Судак": 0,
                "Окунь": 0,
                "Форель": 0,
                "Другое": 0,
                "Всего": 0
            };
            data.push(userEntry);
        }
        userEntry[fishType]++;
        userEntry["Всего"]++;
    });

    res.json(data)
}


exports.getUserCheck = async (req, res) => {
    const { contactID, username } = req.body

    const instance = new JobUsers()

    if (!username) {
        const user = await instance.getUser(contactID)
        if (user) {
            const tournament = await instance.getTournaments(user.id)
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

exports.deleteTour = async (req, res) => {
    const id = req.body.id
    const instance = new JobUsers()
    const result = await instance.deleteTournament(id)
    res.json(result)
}


exports.getContentTour = async (req, res) => {
    const id = req.body.id
    const instance = new JobUsers()
    const tournament = await instance.getContentTour(id)
    res.json(tournament)
}


