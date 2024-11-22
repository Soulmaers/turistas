

const { sql, connection } = require('../dbconfig')
class JobUsers {
    constructor(contactID) {
        this.contactID = contactID

    }



    async getUser() {

        console.log(this.contactID)
        const postModel = `SELECT * FROM users WHERE contactID=@contactID`
        try {
            const pool = await connection
            const result = await pool.request().input('contactID', this.contactID).query(postModel)
            return result.recordset.length == 0 ? null : result.recordset[0]
        }
        catch (e) {
            console.log(e)
        }
    }

    async addUser(username) {

        console.log(typeof this.contactID)
        const postModel = `INSERT INTO users (name_user,contactID) OUTPUT INSERTED. * VALUES(@username, @contactID)`
        try {
            const pool = await connection
            const result = await pool.request().input('contactID', this.contactID).input('username', username).query(postModel)
            console.log(result.recordset)
            return { user: result.recordset[0], tournament: [] }
        }
        catch (e) {
            console.log(e)
        }

    }

    async getTournaments(idUser) {

        const postModel = `SELECT  t.*
        FROM users u 
        LEFT JOIN tournamentParticipans ut ON u.id = ut.id
        LEFT JOIN tournaments t ON t.id = ut.tournament_id
        WHERE u.id = @id
        `;

        try {
            const pool = await connection;
            const result = await pool.request().input('id', idUser).query(postModel);
            const tournaments = result.recordset.filter(tournament =>
                Object.values(tournament).some(value => value !== null)
            );
            return tournaments
        } catch (e) {
            console.log(e);
            return []; // Возвращаем пустые значения в случае ошибки
        }
    }
}

module.exports =
    { JobUsers }