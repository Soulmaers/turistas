
const { JobUsers } = require('../modules/JobUsers')
const { GetContent } = require('../modules/GetContent')
const { ProcessCatch } = require('../modules/ProcessCatch')
const { formatData } = require('../servises/servisFunction')
const multer = require('multer');
const path = require('path')

exports.addTournament = async (req, res) => {
    try {
        const instance = new JobUsers()
        const { id, nameTour, dateStart, dateFinish, users } = req.body
        const tourProps = await instance.createTournament(id, nameTour, dateStart, dateFinish)

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

exports.updateTour = async (req, res) => {
    const { id, nameTour, dateStart, dateFinish, users } = req.body
    try {
        const instance = new JobUsers()
        const tourProps = await instance.updateTournament(id, nameTour, dateStart, dateFinish)
        await Promise.all(users.map(async el => {
            return await instance.tournamentsParticipants(id, el.userId)
        }))
        res.json(tourProps)
    }
    catch (e) {
        console.log(e)
        res.json([])
    }

}
exports.addTour = async (req, res) => {
    const { nameTour, startDate, finishDate, created_by, users } = req.body
    console.log(nameTour, startDate, finishDate, created_by, users)
    try {
        const instance = new JobUsers()
        const tourProps = await instance.createTournament(nameTour, startDate, finishDate, created_by)
        console.log(tourProps)
        await Promise.all(users.map(async el => {
            return await instance.tournamentsParticipants(tourProps.id, el.userId)
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

exports.uploades = async (req, res) => {
    const nameFile = req.body.nameImage

    console.log(nameFile)
    const filePath = path.join(__dirname, `../uploades/${nameFile}`);
    //  const filePath = path.join(uploadsDir, nameFile);
    res.sendFile(filePath)
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //    const destinationPath = path.join(__dirname, '../../client/public/images/');
        const destinationPath = path.join(__dirname, '../uploades/');
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + path.extname(file.originalname);
        cb(null, filename);
    }
});

const setFoto = multer({ storage: storage }).single('image');



exports.updateCatch = async (req, res) => {
    try {
        await new Promise((resolve, reject) => {
            setFoto(req, res, async (err) => {
                if (err) {
                    console.error('Ошибка при загрузке файла:', err);
                    return reject(err); // reject промис в случае ошибки
                }
                resolve('ok'); // resolve промис, когда файл успешно загружен
            });
        });


        const data = req.body;

        const formState = {
            fishs: data.fishs,
            reservuors: data.reservuors,
            typeFishing: data.typeFishing,
            baits: data.baits,
            timeDay: data.timeDay,
            weight: data.weight,
            comment: data.comment,
            idTour: Number(data.idTour),
            idUser: Number(data.idUser),
            urlFoto: req.file?.filename || null,
            date: Math.floor((new Date().getTime()) / 1000),
            idCatch: Number(data.idCatch)
        };


        const mess = await ProcessCatch.updateCatch(formState)
        const result = await ProcessCatch.getCatch(formState.idCatch)
        const catchOne = result.map(e => {
            return {
                idCatch: e.id,
                idTournament: e.idTournament,
                idUser: e.idUser,
                name_user: e.name_user,
                name_reservour: e.name_reservour,
                name_fish: e.name_fish,
                id_fish: e.idFish,
                id_type: e.idTypeCatch,
                id_timeday: e.idTimeDay,
                id_baits: e.idBait,
                id_reservour: e.idReservour,
                name_day: e.name_day,
                name_type: e.name_type,
                name_bait: e.name_bait,
                weight: e.weight,
                data: e.data,
                urlFoto: e.urlFoto
            }
        })
        console.log(catchOne)
        res.json({ mess: mess, catch: catchOne[0] })
    }
    catch (e) {
        console.log(e)
    }
}

exports.setCatch = async (req, res) => {
    console.log('тут')
    try {
        await new Promise((resolve, reject) => {
            setFoto(req, res, async (err) => {
                if (err) {
                    console.error('Ошибка при загрузке файла:', err);
                    return reject(err); // reject промис в случае ошибки
                }
                resolve('ok'); // resolve промис, когда файл успешно загружен
            });
        });


        const data = req.body;
        console.log(data)
        const formState = {
            fishs: data.fishs,
            reservuors: data.reservuors,
            typeFishing: data.typeFishing,
            baits: data.baits,
            timeDay: data.timeDay,
            weight: data.weight,
            comment: data.comment,
            idTour: Number(data.idTour),
            idUser: Number(data.idUser),
            urlFoto: req.file?.filename || null,
            date: Math.floor((new Date().getTime()) / 1000)
        };

        const [result, ok] = await Promise.all([
            ProcessCatch.setCatch(formState),
            ProcessCatch.updateUserStatus(formState)
        ]);
        console.log(result)
        if (ok) {
            res.json({ mess: result, catch: null });
        } else {
            res.json({ mess: 'Ошибка', catch: null });
        }

    } catch (error) {
        console.error('Произошла общая ошибка:', error);
        res.json({ mess: 'Ошибка', catch: null });
    }
};


exports.getCatchsList = async (req, res) => {

    console.time('fetch')
    const result = await ProcessCatch.getAllCatchs()
    console.log(result)
    console.timeEnd('fetch')
    const data = result.map(e => {
        return {
            idCatch: e.id,
            idTournament: e.idTournament,
            idUser: e.idUser,
            name_user: e.name_user,
            name_reservour: e.name_reservour,
            name_fish: e.name_fish,
            id_fish: e.idFish,
            id_type: e.idTypeCatch,
            id_timeday: e.idTimeDay,
            id_baits: e.idBait,
            id_reservour: e.idReservour,
            name_day: e.name_day,
            name_type: e.name_type,
            name_bait: e.name_bait,
            weight: e.weight,
            data: e.data,
            urlFoto: e.urlFoto,
            comment: e.comment
        }
    })
    res.json(data)
}
exports.getCatchs = async (req, res) => {
    console.log('запрос уловов со статичтикой')
    const idTour = req.body.idTour
    const result = await ProcessCatch.getCatchs(idTour)
    const fishCategories = ["Лещ", "Щука", "Судак", "Окунь", "Форель", "Другое", "Всего"];

    const data = [];

    result.forEach(item => {
        // console.log(item)
        const { name_user, name_fish, idUser } = item;
        const fishType = fishCategories.includes(name_fish) ? name_fish : "Другое";

        let userEntry = data.find(entry => entry.name_user === name_user);

        if (!userEntry) {
            userEntry = {
                idUser: idUser,
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

    const maxWeightObject = result.length === 0 ? null : result.reduce((max, current) => {
        return Number(current.weight) > Number(max.weight) ? current : max;
    }, result[0]);

    const bigFish = maxWeightObject && maxWeightObject.weight !== '' ? {
        name_user: maxWeightObject.name_user,
        name_fish: maxWeightObject.name_fish,
        name_reservour: maxWeightObject.name_reservour,
        name_type: maxWeightObject.name_type,
        name_bait: maxWeightObject.name_bait,
        name_day: maxWeightObject.name_day,
        weight: maxWeightObject.weight,
        foto_user: maxWeightObject.foto,
        urlFoto: maxWeightObject.urlFoto,
        data: formatData(maxWeightObject.data)
    } : null;

    data.sort((a, b) => b['Всего'] - a['Всего']);
    res.json({ data, bigFish })
}

exports.deleteCatch = async (req, res) => {
    const id = req.body.id
    const idUser = req.body.idUser
    const [result1, result2] = await Promise.all([ProcessCatch.deleteCatch(id), ProcessCatch.minusFish(idUser)])
    console.log(result1, result2)
    const result = result1 & result2 ? 'Улов удалён' : 'Что-то пошло не так'
    res.json(result)
}



exports.getFisher = async (req, res) => {
    const contactID = req.body.contactID
    const instance = new JobUsers()
    const user = await instance.getUser(contactID)
    console.log(user)
    res.json(user)
}

exports.getUserCheck = async (req, res) => {
    const { contactID, username } = req.body

    const instance = new JobUsers()

    if (!username) {
        const user = await instance.getUser(contactID)
        if (user) {
            const tournament = await instance.getTournaments(user.id)
            // console.log({ user, tournament })
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


