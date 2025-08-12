

const { sql, connection } = require('../dbconfig')


class TournamentInserter {
    constructor(transaction) {
        this.transaction = transaction;
    }

    async insertInto(tableName, tournamentId, idField, dataArray) {
        console.log(tableName);
        console.log(dataArray);
        console.log(idField);
        for (const item of dataArray) {
            const request = new sql.Request(this.transaction);
            request.input('tournamentId', sql.Int, tournamentId);
            request.input(idField, sql.Int, item);
            await request.query(`INSERT INTO ${tableName} (tournamentId, ${idField}) VALUES (@tournamentId, @${idField})`);
        }
        console.log('тута');
    }

    async deleteFrom(tableName, tournamentId, idField, dataArray) {
        for (const item of dataArray) {
            const request = new sql.Request(this.transaction);
            request.input('tournamentId', sql.Int, tournamentId);
            request.input(idField, sql.Int, item);
            await request.query(`DELETE FROM ${tableName} WHERE tournamentId = @tournamentId AND ${idField} = @${idField}`);
        }
    }
    async insertTimings(timeTour) {
        const request = new sql.Request(this.transaction);

        // Создаём строку с параметрами с индексами
        const values = timeTour.map((_, i) => `(@start${i}, @finish${i})`).join(', ');

        // Добавляем параметры
        timeTour.forEach((time, i) => {
            request.input(`start${i}`, sql.Int, time.start);
            request.input(`finish${i}`, sql.Int, time.finish);
        });

        const query = `
            INSERT INTO timing (start, finish)
            OUTPUT INSERTED.id
            VALUES ${values}
        `;

        const result = await request.query(query);
        const ids = result.recordset.map(r => r.id);
        return ids;
    }


    async createTournament(tour, created_by, status) {
        const reu = new sql.Request(this.transaction);
        reu.input('name', sql.VarChar, tour.name);
        reu.input('created_by', sql.Int, created_by);
        reu.input('fotoAll', sql.Bit, tour.fotoAll ? 1 : 0);
        reu.input('fotoLider', sql.Bit, tour.fotoLider ? 1 : 0);
        reu.input('crivictoryId', sql.Int, tour.criVictory.id);
        reu.input('status', sql.Int, status);
        reu.input('dataStart', sql.VarChar, String(tour.timeTour[0].start));
        reu.input('dataFinish', sql.VarChar, String(tour.timeTour[tour.timeTour.length - 1].finish));

        const result = await reu.query(` 
            INSERT INTO tournaments (name, created_by, fotoAll, fotoLider, crivictoryId, status, dateStart, dateFinish) 
            OUTPUT INSERTED.id 
            VALUES (@name, @created_by, @fotoAll, @fotoLider, @crivictoryId, @status, @dataStart, @dataFinish)
        `);

        const tournamentId = result.recordset[0].id;
        const inviteLink = `http://turistas.spb.ru/?event_id=${tournamentId}`;

        const updateReq = new sql.Request(this.transaction);
        await updateReq
            .input('id', sql.Int, tournamentId)
            .input('link', sql.VarChar, inviteLink)
            .query(`
            UPDATE tournaments
            SET link = @link
            WHERE id = @id
          `);

        return tournamentId;
    }

    status = async (timeTour) => {
        const nowData = Math.floor(Date.now() / 1000);
        if (!timeTour.length) return null; // или какой-то статус для пустого массива

        // Найдем минимальный start и максимальный finish
        const starts = timeTour.map(t => Math.floor(new Date(t.start).getTime()));
        const finishes = timeTour.map(t => Math.floor(new Date(t.finish).getTime()));

        const minStart = Math.min(...starts);
        const maxFinish = Math.max(...finishes);
        console.log(nowData, minStart, maxFinish)
        let status;
        if (nowData < minStart) {
            status = 0; // Будущий
        } else if (nowData > maxFinish) {
            status = 2; // Прошедший
        } else {
            status = 1; // Текущий (текущий момент внутри общего интервала)
        }

        return status;
    }

    // --- Универсальная функция для обновления связей ---
    async updateRelation(tableName, idField, newItems, idTour) {
        console.log(tableName, idField)
        // Получаем текущие записи из базы
        const currentRecords = await this.getTournamentConnect(idField, idTour, tableName)
        const currentIds = currentRecords.map(r => r[idField]);
        console.log(currentIds)
        console.log(newItems)
        // Выделяем id из новых данных
        // const newIds = newItems.map(item => item[idField]);
        // console.log(newIds)
        // Определяем что добавить и что удалить
        const toAdd = newItems.filter(i => !currentIds.includes(i));
        const toRemove = currentIds.filter(i => !newItems.includes(i));
        console.log(toAdd)
        // Удаляем лишние
        if (toRemove.length) {
            await this.deleteFrom(tableName, idTour, idField, toRemove);
        }
        // Добавляем новые
        if (toAdd.length) {
            await this.insertInto(tableName, idTour, idField, toAdd);
        }
    }


    async getTournamentConnect(id, idTour, table) {
        const queris = `SELECT ${id} FROM ${table} WHERE tournamentId=@tournamentId`
        try {
            const request = new sql.Request(this.transaction);
            const result = await request
                .input('tournamentId', idTour)
                .query(queris);
            return result.recordset;
        } catch (error) {
            console.error("Error fetching tournament users:", error);
            return []; // Возвращаем пустой массив в случае ошибки
        }
    }

    async updateTournament(id, name, startTime, finishTime, fotoAll, fotoLider, dopsub) {
        console.log(name)
        const nowData = Math.floor((new Date().getTime()) / 1000)
        const status = nowData > Number(finishTime) ? 2 : nowData > Number(startTime) ? 1 : 0
        const updateModel = `UPDATE tournaments SET name = @name, dateStart = @startTime, dateFinish = @finishTime,
         status = @status, fotoLider=@fotoLider,fotoAll=@fotoAll, dopsub=@dopsub OUTPUT INSERTED.*  WHERE id = @id`;

        try {
            const request = new sql.Request(this.transaction);
            const result = await request
                .input('id', id)
                .input('name', name)
                .input('startTime', startTime)
                .input('finishTime', finishTime)
                .input('status', status)
                .input('fotoAll', fotoAll)
                .input('fotoLider', fotoLider)
                .input('dopsub', dopsub)
                .query(updateModel);

            return result.recordset[0];
        }
        catch (e) {
            console.log(e)
            return []
        }

    }

    async deleteTimings(timingIds) {
        if (!timingIds.length) return;
        const request = new sql.Request(this.transaction);
        const idsParam = timingIds.join(', ');
        const query = `DELETE FROM timing WHERE id IN (${idsParam})`;
        await request.query(query);
    }
    async updateTournamentTimings(tournamentId, newTimings) {
        // newTimings — массив объектов { id?, start, finish }
        // Получаем текущие связи
        const currentRelations = await this.getTournamentConnect('timingId', tournamentId, 'tournamentTimings');
        const currentIds = currentRelations.map(r => r.timingId);
        console.log('newTimings:', newTimings);

        // Определяем, что удалить (есть в current, но нет в новых)
        const newIds = newTimings.filter(t => t.id).map(t => t.id);
        const toRemove = currentIds.filter(id => !newIds.includes(id));

        // Удаляем связи и интервалы, которых нет в новых
        if (toRemove.length) {
            await this.deleteTimingRelations(tournamentId, toRemove);
            await this.deleteTimings(toRemove);
        }

        // Теперь для всех новых интервалов (и тех, что с id, и без id) — 
        // если у интервала есть id — удаляем старый интервал и связь,
        // затем создаём новый интервал и связь с новыми значениями

        // Сначала удаляем старые интервалы и связи для интервалов с id
        const toReplace = newTimings.filter(t => t.id);
        if (toReplace.length) {
            const idsToReplace = toReplace.map(t => t.id);
            await this.deleteTimingRelations(tournamentId, idsToReplace);
            await this.deleteTimings(idsToReplace);
        }

        // Объединяем все новые интервалы (без id и заменённые с id)
        const allNewIntervals = [
            ...newTimings.filter(t => !t.id),
            ...toReplace
        ];

        if (allNewIntervals.length) {
            // Вставляем новые интервалы
            const insertedIds = await this.insertTimings(allNewIntervals);
            // Вставляем связи
            await this.insertTimingRelations(tournamentId, insertedIds);
        }
    }

    async deleteTimingRelations(tournamentId, timingIds) {
        if (!timingIds.length) return;
        const request = new sql.Request(this.transaction);
        const idsParam = timingIds.join(', ');
        const query = `
            DELETE FROM tournamentTimings 
            WHERE tournamentId = @tournamentId AND timingId IN (${idsParam})
        `;
        await request.input('tournamentId', sql.Int, tournamentId).query(query);
    }

    async insertTimingRelations(tournamentId, timingIds) {
        if (!timingIds.length) return;
        const values = timingIds.map(id => `(${tournamentId}, ${id})`).join(', ');
        const query = `
            INSERT INTO tournamentTimings (tournamentId, timingId)
            VALUES ${values}
        `;
        const request = new sql.Request(this.transaction);
        await request.query(query);
    }
}


module.exports = { TournamentInserter }