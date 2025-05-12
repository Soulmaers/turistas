


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

}
