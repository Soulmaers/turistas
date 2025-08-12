const { sql, connection } = require('../dbconfig')


class ProcessCatch {


    static async updateUserStatus(data) {
        const idUser = data.idUser
        const post = `UPDATE users SET fishs=fishs + 1 WHERE id=@id`

        try {
            const pool = await connection
            await pool.request()
                .input('id', idUser)
                .query(post)
            return 'Статус обновлен'
        }
        catch (e) {
            console.log(e)
            return null
        }
    }
    static async getStatusUser(id) {
        const post = `SELECT * FROM users WHERE id=@id`

        try {
            const pool = await connection
            const result = await pool.request()
                .input('id', id)
                .query(post)
            return result.recordset
        }
        catch (e) {
            console.log(e)
            return null
        }
    }

    static async updateCatch(data) {
        console.log(data)
        const { idCatch, fishs, reservuors, typeFishing, timeDay, baits, weight, comment, urlFoto } = data
        const res = reservuors ? Number(reservuors) : 0
        const type = typeFishing ? Number(typeFishing) : 0
        const bait = baits ? Number(baits) : 0

        const post = `UPDATE catch SET idFish=@fishs, idReservour=@reservuors, idTypeCatch=@typeFishing, idTimeDay=@timeDay,idBait=@baits,weight=@weight,comment=@comment,urlFoto=@urlFoto
       WHERE id=@idCatch `

        try {
            const pool = await connection
            const result = await pool.request()
                .input('fishs', Number(fishs))
                .input('idCatch', Number(idCatch))
                .input('reservuors', res)
                .input('typeFishing', type)
                .input('timeDay', Number(timeDay))
                .input('baits', bait)
                .input('weight', weight)
                .input('comment', comment)
                .input('urlFoto', urlFoto)
                .query(post)
            return 'Улов обновлен'
        }
        catch (e) {
            console.log(e)
            return 'Что-то пошло не так'

        }
    }
    static async setCatch(data) {
        const { idTour, idUser, fishs, reservuors, typeFishing, timeDay, baits, weight, comment, date, urlFoto } = data

        const res = reservuors ? Number(reservuors) : 0
        const type = typeFishing ? Number(typeFishing) : 0
        const bait = baits ? Number(baits) : 0
        console.log(data)
        const post = `INSERT INTO catch(idTournament, idUser, idFish,idReservour,idTypeCatch,idTimeDay,idBait,weight,comment,data,urlFoto)
           VALUES (@idTour, @idUser, @fishs, @reservuors, @typeFishing, @timeDay, @baits, @weight, @comment, @date,@urlFoto)`

        try {
            const pool = await connection
            const result = await pool.request()
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
                .input('urlFoto', urlFoto)
                .query(post)
            return 'Улов добавлен'
        }
        catch (e) {
            console.log(e)
            return 'Что-то пошло не так'
        }
    }

    static async deleteCatch(id) {
        const post = `DELETE FROM catch WHERE id=@id`
        try {
            const pool = await connection
            await pool.request()
                .input('id', id)
                .query(post)
            return true
        }
        catch (e) {
            console.log(e)
            return false
        }
    }
    static async minusFish(id) {
        const post = 'UPDATE users SET fishs = fishs - 1 WHERE id = @id'
        try {
            const pool = await connection
            await pool.request()
                .input('id', id)
                .query(post)
            return true
        }
        catch (e) {
            console.log(e)
            return false
        }
    }


    static async getAllCatchs() {
        const post = `
        SELECT 
        c.id,
        c.idTournament,
            c.idUser,
            c.idFish,
            c.idReservour,
            c.idTypeCatch,
            c.idTimeDay,
            c.idBait,
            c.comment,
            c.data,
            u.name_user,
            u.foto,
            f.name as name_fish,
            c.weight,
            c.urlFoto,
            r.name AS name_reservour,
                t.name AS name_type,
                   b.name AS name_bait,
                   d.name as name_day
        FROM 
            catch c
        INNER JOIN 
            users u ON c.idUser = u.id
               INNER JOIN 
            reservours r ON c.idReservour = r.id
                 INNER JOIN 
            fishs f ON c.idFish = f.id
                   INNER JOIN 
            type_catch t ON c.idTypeCatch = t.id
                   INNER JOIN 
            baits b ON c.idBait = b.id
                    INNER JOIN 
            time_day d ON c.idTimeDay = d.id
          `;

        try {
            const pool = await connection
            const res = await pool.request()
                .query(post)
            return res.recordset
        }
        catch (e) {
            console.log(e)
            return []
        }
    }

    static async getCatch(idCatch) {
        const post = `
        SELECT 
        c.id,
          c.idTournament,
            c.idUser,
            c.idFish,
            c.idReservour,
            c.idTypeCatch,
            c.idTimeDay,
            c.idBait,
            c.data,
            u.name_user,
            u.foto,
            f.name as name_fish,
            c.weight,
            c.urlFoto,
            r.name AS name_reservour,
                t.name AS name_type,
                   b.name AS name_bait,
                   d.name as name_day
        FROM 
            catch c
        INNER JOIN 
            users u ON c.idUser = u.id
               INNER JOIN 
            reservours r ON c.idReservour = r.id
                 INNER JOIN 
            fishs f ON c.idFish = f.id
                   INNER JOIN 
            type_catch t ON c.idTypeCatch = t.id
                   INNER JOIN 
            baits b ON c.idBait = b.id
                    INNER JOIN 
            time_day d ON c.idTimeDay = d.id
        WHERE 
            c.id = @idCatch
    `;

        try {
            const pool = await connection
            const res = await pool.request()
                .input('idCatch', idCatch)
                .query(post)
            return res.recordset
        }
        catch (e) {
            console.log(e)
            return []
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
            c.data,
            u.name_user,
            u.foto,
            f.name as name_fish,
            c.weight,
            c.urlFoto,
            r.name AS name_reservour,
                t.name AS name_type,
                   b.name AS name_bait,
                   d.name as name_day
        FROM 
            catch c
        INNER JOIN 
            users u ON c.idUser = u.id
               INNER JOIN 
            reservours r ON c.idReservour = r.id
                 INNER JOIN 
            fishs f ON c.idFish = f.id
                   INNER JOIN 
            type_catch t ON c.idTypeCatch = t.id
                   INNER JOIN 
            baits b ON c.idBait = b.id
                    INNER JOIN 
            time_day d ON c.idTimeDay = d.id
        WHERE 
            c.idTournament = @idTour
    `;

        try {
            const pool = await connection
            const res = await pool.request()
                .input('idTour', idTour)
                .query(post)
            return res.recordset
        }
        catch (e) {
            console.log(e)
            return []
        }
    }
}


module.exports = { ProcessCatch }