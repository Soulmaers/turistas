
const { sql, connection } = require('../dbconfig')

class UpdatePropTournaments {



    static async getTournaments() {
        const post = `SELECT * FROM tournaments`
        try {
            const pool = await connection
            const result = await pool.request().query(post)
            return result.recordset ? result.recordset : []
        }
        catch (e) {
            console.log(e)
        }
    }


    static async updateStatus(obj) {
        const post = `UPDATE tournaments SET status =@status WHERE id=@id `
        try {
            const pool = await connection
            const result = await pool.request()
                .input('status', obj.status)
                .input('id', obj.id)
                .query(post)
            return 'Статус обновлён'
        }
        catch (e) {
            console.log(e)
        }
    }
}


module.exports = {
    UpdatePropTournaments
}