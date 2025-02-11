const { sql, connection } = require('../dbconfig')


class ProcessCatch {


    static async setCatch(data) {
        const { idTour, idUser, fishs, reservuors, typeFishing, timeDay, baits, weight, comment, date } = data

        const res = reservuors ? Number(reservuors) : 0
        const type = typeFishing ? Number(typeFishing) : 0
        const bait = baits ? Number(baits) : 0
        const post = `INSERT INTO catch(idTournament, idUser, idFish,idReservour,idTypeCatch,idTimeDay,idBait,weight,comment,data)
          VALUES (@idTour, @idUser, @fishs, @reservuors, @typeFishing, @timeDay, @baits, @weight, @comment, @date)`

        try {
            const pool = await connection
            await pool.request()
                .input('idTour', idTour)
                .input('idUser', idUser)
                .input('fishs', Number(fishs))
                .input('reservuors', res)
                .input('typeFishing', type)
                .input('timeDay', Number(timeDay))
                .input('baits', bait)
                .input('weight', weight)
                .input('comment', comment)
                .input('date', date)
                .query(post)
            return 'Улов добавлен'
        }
        catch (e) {
            console.log(e)
            return 'Что-то пошло не так'
        }
    }

    static async getCatchs(idTour) {
        const post = `
        SELECT 
            c.idUser,
            c.idFish,
            c.idReservour,
            c.idTypeCatch,
            c.idTimeDay,
            c.idBait,
            t.name_user,
            f.name
        FROM 
            catch c
        INNER JOIN 
            users t ON c.idUser = t.id
               INNER JOIN 
            fishs f ON c.idFish = f.id
        WHERE 
            c.idTournament = @idTour
    `;

        try {
            const pool = await connection
            const res = await pool.request()
                .input('idTour', idTour)
                .query(post)
            console.log(res.recordset)
            return res.recordset
        }
        catch (e) {
            console.log(e)
            return []
        }
    }
}


module.exports = { ProcessCatch }