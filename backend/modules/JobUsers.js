

const { sql, connection } = require('../dbconfig')
class JobUsers {
    constructor() {
    }

    async getUser(contactID, password) {
        console.log(contactID, password)
        const postModel = `SELECT * FROM users WHERE contactID=@contactID AND password=@password`
        try {
            const pool = await connection
            const result = await pool.request().input('contactID', contactID).input('password', password).query(postModel)
            console.log(result.recordset)
            return result.recordset.length == 0 ? null : result.recordset[0]
        }
        catch (e) {
            console.log(e)
        }
    }

    async getFisher(contactID) {
        console.log(contactID)
        const postModel = `SELECT * FROM users WHERE contactID=@contactID`
        try {
            const pool = await connection
            const result = await pool.request().input('contactID', contactID).query(postModel)
            console.log(result.recordset)
            return result.recordset.length == 0 ? null : result.recordset[0]
        }
        catch (e) {
            console.log(e)
        }
    }

    async addUser(contactID, password, username) {
        const postModel = `INSERT INTO users (name_user,contactID,password) OUTPUT INSERTED. * VALUES(@username, @contactID,@password)`
        try {
            const pool = await connection
            const result = await pool.request().input('contactID', contactID).input('username', username).input('password', password).query(postModel)
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
            // Проверяем, есть ли записи в результате
            const tournaments = result.recordset;
            // Если все записи содержат null, возвращаем пустой массив
            if (tournaments.length === 0 ||
                tournaments.every(tournament => Object.values(tournament).every(value => value === null))) {
                return [];
            }
            return tournaments;
        } catch (e) {
            console.log(e);
            return []; // Возвращаем пустые значения в случае ошибки
        }
    }


    async tournamentsParticipants(tournamentID, userID) {

        const postModel = `INSERT INTO tournamentParticipants (userID, tournamentID) VALUES(@userID, @tournamentID)`;

        try {
            const pool = await connection;
            await pool.request()
                .input('userID', userID)
                .input('tournamentID', tournamentID)
                .query(postModel);

            return 'Участник успешно зарегистрирован в турнире.';
        } catch (e) {
            console.log(e);
            return 'Произошла ошибка при регистрации участника.';
        }
    }


    async updateTournament(id, name, startTime, finishTime) {
        const nowData = Math.floor((new Date().getTime()) / 1000)
        const status = nowData > Number(finishTime) ? 2 : nowData > Number(startTime) ? 1 : 0
        const updateModel = `UPDATE tournaments SET name = @name, dateStart = @startTime, dateFinish = @finishTime, status = @status OUTPUT INSERTED.*  WHERE id = @id`;

        try {
            const pool = await connection;
            const result = await pool.request()
                .input('id', id)
                .input('name', name)
                .input('startTime', startTime)
                .input('finishTime', finishTime)
                .input('status', status)
                .query(updateModel);

            return result.recordset[0];
        }
        catch (e) {
            console.log(e)
            return []
        }

    }

    async updateAnchorState(id, state, clicktour) {
        console.log(id, state, clicktour)
        const updateModel = `UPDATE users SET state_card = @state_card, idClick_tour = @idClick_tour
       WHERE id = @id`;

        try {
            const pool = await connection;
            const result = await pool.request()
                .input('id', id)
                .input('state_card', state)
                .input('idClick_tour', clicktour)
                .query(updateModel);

            return true
        }
        catch (e) {
            console.log(e)
            return false
        }

    }

    async createTournament(name, startTime, finishTime, created_by) {
        const nowData = Math.floor((new Date().getTime()) / 1000)
        const status = nowData > Number(finishTime) ? 2 : nowData > Number(startTime) ? 1 : 0

        // Определяем SQL для вставки нового турнира
        const insertModel = `INSERT INTO tournaments (name, dateStart, dateFinish, created_by, status) OUTPUT INSERTED.* VALUES (@name, @startTime, @finishTime, @created_by, @status)`;

        try {
            const pool = await connection;

            // Если не существует, выполняем INSERT
            const result = await pool.request()
                .input('name', name)
                .input('startTime', startTime)
                .input('finishTime', finishTime)
                .input('created_by', created_by)
                .input('status', status)
                .query(insertModel);

            // Возвращаем созданную или обновленную запись
            return result.recordset[0];
        }
        catch (e) {
            console.log(e);
            return [];
        }
    }


    async removeParticipantFromTournament(tournamentID, id) {
        const postModel = `DELETE tournamentParticipants WHERE userID=@userID AND tournamentID=@tournamentID`;

        try {
            const pool = await connection;
            await pool.request()
                .input('userID', id)
                .input('tournamentID', tournamentID)
                .query(postModel);

            return 'Участник успешно удален из турнира';
        } catch (e) {
            console.log(e);
            return 'Произошла ошибка при регистрации участника.';
        }
    }
    async getContentTour(id) {
        try {
            const tournamentData = await this.getTournamentData(id); // Первый запрос - данные о турнире
            if (!tournamentData) {
                return null; // Турнир не найден
            }

            const users = await this.getTournamentUsers(id); // Второй запрос - участники турнира
            return { ...tournamentData[0], users }; // объединение данных
        } catch (error) {
            console.error("Error fetching tournament data:", error);
            return null;
        }
    }

    async getTournamentData(id) {
        const query = `SELECT * FROM tournaments WHERE id = @id`;
        try {
            const pool = await connection;
            const result = await pool.request().input('id', id).query(query);
            return result.recordset;
        } catch (error) {
            console.error("Error fetching tournament data:", error);
            return null;
        }
    }

    async getTournamentUsers(id) {
        const query = `
            SELECT u.name_user, u.contactID, u.id AS userId
            FROM tournamentParticipants tp
            JOIN users u ON tp.userId = u.id
            WHERE tp.tournamentId = @id;
        `;
        try {
            const pool = await connection;
            const result = await pool.request().input('id', id).query(query);
            return result.recordset;
        } catch (error) {
            console.error("Error fetching tournament users:", error);
            return []; // Возвращаем пустой массив в случае ошибки
        }
    }



    async deleteTournament(id) {
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