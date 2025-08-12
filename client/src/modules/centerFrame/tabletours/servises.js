


export class Helpers {


    static formatData(data) {
        const date = new Date(data * 1000);
        // Получаем компоненты даты
        const day = String(date.getDate()).padStart(2, '0'); // Добавляем ведущий ноль
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
        const year = String(date.getFullYear()).slice(-2); // Берем последние 2 цифры года

        // Формируем строку в нужном формате
        const formattedDate = `${day}.${month}.${year}`;
        console.log(formattedDate);
        return formattedDate;
    }


    static razbor(timeTour, now) {
        const nowData = Math.floor(now / 1000);

        const minStart = timeTour.reduce((min, interval) => interval.start < min ? interval.start : min, timeTour[0].start);
        const maxFinish = timeTour.reduce((max, interval) => interval.finish > max ? interval.finish : max, timeTour[0].finish);

        if (nowData < minStart) {
            return false
        } else if (nowData > maxFinish) {
            return false
        } else {
            // Проверяем, попадает ли nowData в какой-то интервал
            const currentInterval = timeTour.find(interval => nowData >= interval.start && nowData <= interval.finish);
            if (currentInterval) {
                return true
            } else {
                // nowData между minStart и maxFinish, но не в интервале — значит прерванный
                return false
            }
        }

    }

}
