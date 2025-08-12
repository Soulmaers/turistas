
const { JobUsers } = require('../modules/JobUsers')
const { GetContent } = require('../modules/GetContent')
const { ProcessCatch } = require('../modules/ProcessCatch')
const { TournamentInserter } = require('../modules/TourProcess')
const { formatData } = require('../servises/servisFunction')
const multer = require('multer');
const path = require('path')
const exifr = require('exifr');
const fs = require('fs');

const { sql, connection } = require('../dbconfig')

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
    console.log(req.body)
    const { id, name, dateStart, dateFinish, dopsub, fotoLider, fotoAll, fishers, fishs, typeBaits, typeCatch, reservours, timeTour } = req.body;

    const start = String(timeTour[0].start)
    const finish = String(timeTour[timeTour.length - 1].finish)
    let transaction;
    try {
        const pool = await connection; // Подключаемся к базе данных
        transaction = new sql.Transaction(pool); // Создаем новую транзакцию
        await transaction.begin(); // Начинаем транзакцию

        try {
            const instanceTourProcess = new TournamentInserter(transaction);
            const tourProps = await instanceTourProcess.updateTournament(id, name, start, finish, fotoAll, fotoLider, dopsub);

            await instanceTourProcess.updateRelation('tournamentParticipants', 'userId', fishers.map(e => e.userId), id);
            await instanceTourProcess.updateRelation('tournamentFishs', 'fishId', fishs.map(e => e.id), id);
            await instanceTourProcess.updateRelation('tournamentReservours', 'reservourId', reservours.map(e => e.id), id);
            await instanceTourProcess.updateRelation('tournamentTypeBaits', 'typebaitId', typeBaits.map(e => e.id), id);
            await instanceTourProcess.updateRelation('tournamentTypeCatch', 'typecatchId', typeCatch.map(e => e.id), id);
            await instanceTourProcess.updateTournamentTimings(id, timeTour);

            await transaction.commit();

            res.json(tourProps);
        } catch (err) {
            await transaction.rollback();
            console.error('Transaction error:', err);
            res.status(500).json({ error: 'Ошибка при обновлении турнира' });
        }
    } catch (err) {
        console.error('Connection error:', err);
        res.status(500).json({ error: 'Ошибка подключения к базе данных' });
    }
};






exports.addTour = async (req, res) => {
    const tour = req.body.tourEvent;
    const created_by = req.body.created_by;

    // Проверка входных данных
    if (!tour || !created_by) {
        return res.status(400).json({ error: 'Недостаточно данных для создания турнира.' });
    }

    let transaction;

    try {
        const pool = await connection; // Подключаемся к базе данных
        transaction = new sql.Transaction(pool); // Создаем новую транзакцию

        await transaction.begin(); // Начинаем транзакцию

        const inserter = new TournamentInserter(transaction);

        const timingIds = await inserter.insertTimings(tour.timeTour);
        const status = await inserter.status(tour.timeTour)
        const tournamentId = await inserter.createTournament(tour, created_by, status);

        // Проверка на наличие идентификаторов
        if (!tournamentId || !timingIds || timingIds.length === 0) {
            throw new Error('Не удалось создать турнир или получить идентификаторы таймингов.');
        }

        await inserter.insertInto('tournamentTimings', tournamentId, 'timingId', timingIds);
        await inserter.insertInto('tournamentParticipants', tournamentId, 'userId', tour.fishers.map(e => e.userId));
        await inserter.insertInto('tournamentFishs', tournamentId, 'fishId', tour.fishs.map(e => e.id));
        await inserter.insertInto('tournamentReservours', tournamentId, 'reservourId', tour.reservours.map(e => e.id));
        await inserter.insertInto('tournamentTypeBaits', tournamentId, 'typebaitId', tour.typeBaits.map(e => e.id));
        await inserter.insertInto('tournamentTypeCatch', tournamentId, 'typecatchId', tour.typeCatch.map(e => e.id));

        await transaction.commit(); // Подтверждаем транзакцию

        // Возвращаем созданный турнир
        const createdTournament = {
            id: tournamentId,
            name: tour.name,
            created_by,
            fotoAll: tour.fotoAll,
            fotoLider: tour.fotoLider,
            crivictoryId: tour.criVictory.id,
            status: status, // Убедитесь, что статус определен
            timeTour: tour.timeTour,
            fishers: tour.fishers,
            fishs: tour.fishs,
            reservours: tour.reservours,
            typeBaits: tour.typeBaits,
            typeCatch: tour.typeCatch,
            dateStart: String(tour.timeTour[0].start),
            dateFinish: String(tour.timeTour[tour.timeTour.length - 1].finish)
        };

        res.json(createdTournament);
    } catch (error) {
        if (transaction) {
            await transaction.rollback(); // Откатываем транзакцию в случае ошибки
        }
        console.error('Ошибка при создании турнира:', error); // Логируем ошибку для отладки
        res.status(500).json({ error: 'Произошла ошибка при создании турнира.' }); // Возвращаем ошибку клиенту
    }
};



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
        console.log(data.urlFoto)
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
            urlFoto: req.file?.filename || data.urlFoto || null,
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

        let exifDate = null;

        if (req.file && req.file.path) {
            try {
                const exif = await exifr.parse(filePath, { gps: true, tiff: true, exif: true })
                console.log(exif)
                console.log(exif.ComponentsConfiguration)
                if (exif?.DateTimeOriginal) {
                    exifDate = Math.floor(new Date(exif.DateTimeOriginal).getTime() / 1000);
                    console.log('Дата съёмки из EXIF:', exif.DateTimeOriginal);
                }
            } catch (err) {
                console.warn('EXIF не извлечён:', err);
            }
        }

        const data = req.body;
        console.log(exifDate)
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
            date: exifDate || Math.floor((new Date().getTime()) / 1000)
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

exports.getFisherAddTour = async (req, res) => {
    const contactID = req.body.contactID
    const instance = new JobUsers()
    const user = await instance.getFisher(contactID)
    console.log(user)
    res.json(user)
}



exports.getUserCheck = async (req, res) => {
    const { contactID, passValue, username } = req.body

    const instance = new JobUsers()

    if (!username) {
        const user = await instance.getUser(contactID, passValue)
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
        const propsUser = await instance.addUser(contactID, passValue, username);
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

exports.updateAnchor = async (req, res) => {
    const id = req.body.userId
    const state = req.body.stateBody
    const clickIDtour = req.body.idClickTour
    const instance = new JobUsers()
    const result = await instance.updateAnchorState(id, state, clickIDtour)
    res.json(result)
}






