

export const formatUnixTime = (unixTimestamp) => {

    // Создаем оъект Date из UNIX времени (умножаем на 1000, так как Date принимает миллисекунды)
    const date = new Date(unixTimestamp * 1000);
    // Получаем часы, минуты и секунды
    const hours = String(date.getHours()).padStart(2, '0'); // Форматируем с ведущим нулем
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Форматируем с ведущим нулем
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Форматируем с ведущим нулем
    // Получаем день и месяц
    const day = String(date.getDate()).padStart(2, '0'); // Форматируем с ведущим нулем
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = String(date.getFullYear())
    // Форматируем время и дату
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
}