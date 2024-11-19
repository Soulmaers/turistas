

const { connection } = require('../../dbconfig')
class JobUsers {
    constructor(contactID) {
        this.contactID = contactID

    }



    async getUser() {
        const postModel = `SELECT * FROM users WHERE contactID=@contactID`
        try {
            const pool = await connection
            const result = pool.request().input('contactID', this.contactID).query(postModel)
            return result.recordset
        }
        catch (e) {
            console.log(e)
        }
    }

    async addUser(username) {
        const postModel = `INSERT INTO users (username,contactID) OUTPUT INSERTED. * VALUES(@username, @contactID)`
        try {
            const pool = await connection
            const result = pool.request().input('contactID', this.contactID).input('username', username).query(postModel)
            return result.recordset[0]
        }
        catch (e) {
            console.log(e)
        }

    }

    async getTournaments(idUser) {
        const postModel = `
SELECT
u. *,
t. *

FROM users u 
LEFT JOIN tournamentPermission ut ON u.id==ut.idUser
LEFT JOIN tournaments t ON t.id=ut.idTournaments
WHERE u.id=idUser
`
        try {
            const pool = await connection
            const result = pool.request().input('id', idUser).query(postModel)
            return result.recordset
        }
        catch (e) {
            console.log(e)
        }
    }
}


module.exports =
    { JobUsers }