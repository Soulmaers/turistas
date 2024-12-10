

const { sql, connection } = require('../dbconfig')
class JobUsers {
    constructor() {
    }

    async getUser(contactID) {
        const postModel = `SELECT * FROM users WHERE contactID=@contactID`
        try {
            const pool = await connection
            const result = await pool.request().input('contactID', contactID).query(postModel)
            return result.recordset.length == 0 ? null : result.recordset[0]
        }
        catch (e) {
            console.log(e)
        }
    }

    async addUser(contactID, username) {
        const postModel = `INSERT INTO users (name_user,contactID) OUTPUT INSERTED. * VALUES(@username, @contactID)`
        try {
            const pool = await connection
            const result = await pool.request().input('contactID', contactID).input('username', username).query(postModel)
            return { user: result.recordset[0], tournament: [] }
        }
        catch (e) {
            console.log(e)
        }

    }

    async getTournaments(idUser) {

        const postModel = `SELECT  t.*
        FROM users u 
        LEFT JOIN tournamentParticipants ut ON u.id = ut.userId
        LEFT JOIN tournaments t ON t.id = ut.tournamentId
       WHERE u.id = @id    ORDER BY t.id
        `;

        try {
            const pool = await connection;
            const result = await pool.request().input('id', idUser).query(postModel);
            return result.recordset
        } catch (e) {
            console.log(e);
            return []; // Возвращаем пустые значения в случае ошибки
        }
    }


    async tournamentsPartopanses(tournamentID, userID) {
        const postModel = `INSERT INTO tournamentParticipants (userID, tournamentID) VALUES(@userID,@tournamentID)`
        try {
            const pool = await connection
            const result = await pool.request().input('userID', userID).input('tournamentID', tournamentID).query(postModel)
            return 'Турнир создан'
        } catch (e) {
            console.log(e)
            return []
        }
    }



    async createTournament(name, startTime, finishTime, created_by) {
        console.log(name, startTime, finishTime, created_by)
        const status = 0
        const postModel = `INSERT INTO tournaments (name, dateStart, dateFinish, created_by, status) 
OUTPUT INSERTED.* 
VALUES (@name, @startTime, @finishTime, @created_by, @status)`

        try {
            const pool = await connection
            const result = await pool.request()
                .input('name', name)
                .input('startTime', startTime)
                .input('finishTime', finishTime)
                .input('created_by', created_by)
                .input('status', status)
                .query(postModel)

            return result.recordset[0]
        } catch (e) {
            console.log(e)
            return []

        }

    }

    async deleteTournament(id) {
        console.log(id)
        const post = `DELETE FROM tournaments WHERE id=@id`

        try {
            const pool = await connection
            const res = await pool.request()
                .input('id', id)
                .query(post)
            return 'ОК'
        }

        catch (e) {
            console.log(e)
        }
    }
}



module.exports =
    { JobUsers }