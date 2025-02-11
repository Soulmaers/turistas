const { sql, connection } = require('../dbconfig')


class GetContent {


    static async getReservours() {
        const pool = await connection
        const post = 'SELECT * FROM reservours'

        try {
            const result = await pool.request().query(post)
            return result.recordset ? result.recordset.filter(e => e.id !== 0).map(el => el) : null
        } catch (e) {
            console.log(e)
            return null
        }
    }

    static async getFishs() {
        const pool = await connection
        const post = 'SELECT * FROM fishs'

        try {
            const result = await pool.request().query(post)
            return result.recordset ? result.recordset : null
        } catch (e) {
            console.log(e)
            return null
        }
    }
    static async getBaits() {
        const pool = await connection
        const post = 'SELECT * FROM baits'

        try {
            const result = await pool.request().query(post)
            return result.recordset ? result.recordset.filter(e => e.id !== 0).map(el => el) : null
        } catch (e) {
            console.log(e)
            return null
        }
    }
    static async getTimeDay() {
        const pool = await connection
        const post = 'SELECT * FROM time_day'

        try {
            const result = await pool.request().query(post)
            return result.recordset ? result.recordset : null
        } catch (e) {
            console.log(e)
            return null
        }
    }
    static async getTypeCatch() {
        const pool = await connection
        const post = 'SELECT * FROM type_catch'

        try {
            const result = await pool.request().query(post)
            return result.recordset ? result.recordset.filter(e => e.id !== 0).map(el => el) : null
        } catch (e) {
            console.log(e)
            return null
        }
    }

}

module.exports =
    { GetContent }