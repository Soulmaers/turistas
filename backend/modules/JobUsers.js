

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


    async tournamentsParticipants(tournamentID, userID) {
        const checkModel = `SELECT COUNT(*) AS count FROM tournamentParticipants WHERE userID = @userID AND tournamentID = @tournamentID`;
        const postModel = `INSERT INTO tournamentParticipants (userID, tournamentID) VALUES(@userID, @tournamentID)`;

        try {
            const pool = await connection;

            // Проверка существования записи
            const checkResult = await pool.request()
                .input('userID', userID)
                .input('tournamentID', tournamentID)
                .query(checkModel);

            if (checkResult.recordset[0].count > 0) {
                return 'Участник уже зарегистрирован в турнире.';
            }

            // Если записи нет, выполняем вставку
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



    async createTournament(id, name, startTime, finishTime, created_by) {
        console.log(id)
        const status = 0;
        // Определяем SQL для проверки существования турнира
        const checkExistenceModel = `SELECT COUNT(*) as count FROM tournaments WHERE id = @id`;
        // Определяем SQL для обновления турнира
        const updateModel = `UPDATE tournaments SET name = @name, dateStart = @startTime, dateFinish = @finishTime, created_by = @created_by, status = @status OUTPUT INSERTED.*  WHERE id = @id`;
        // Определяем SQL для вставки нового турнира
        const insertModel = `INSERT INTO tournaments (name, dateStart, dateFinish, created_by, status) OUTPUT INSERTED.* VALUES (@name, @startTime, @finishTime, @created_by, @status)`;

        try {
            const pool = await connection;
            // Проверяем, существует ли турнир с данным id
            const existenceResult = await pool.request()
                .input('id', id)
                .query(checkExistenceModel);

            const exists = existenceResult.recordset[0].count > 0;
            console.log(exists)
            let result;

            if (exists) {
                // Если существует, выполняем UPDATE
                result = await pool.request()
                    .input('id', id)
                    .input('name', name)
                    .input('startTime', startTime)
                    .input('finishTime', finishTime)
                    .input('created_by', created_by)
                    .input('status', status)
                    .query(updateModel);
            } else {
                // Если не существует, выполняем INSERT
                result = await pool.request()
                    .input('name', name)
                    .input('startTime', startTime)
                    .input('finishTime', finishTime)
                    .input('created_by', created_by)
                    .input('status', status)
                    .query(insertModel);
            }

            // Возвращаем созданную или обновленную запись
            console.log()
            return result.recordset[0];

        } catch (e) {
            console.log(e);
            return [];
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