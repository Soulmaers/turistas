const { UpdatePropTournaments } = require('../modules/UpdatePropTournaments')

const updateStatusTournaments = async () => {
    const nowData = Math.floor(Date.now() / 1000);
    const tournaments = await UpdatePropTournaments.getTournaments();

    // Только те турниры, где статус нужно обновить
    const tournamentsToUpdate = tournaments.filter(tournament => {
        const newStatus = nowData > Number(tournament.dateFinish)
            ? 2
            : nowData > Number(tournament.dateStart)
                ? 1
                : tournament.status;

        return newStatus !== tournament.status;
    });

    // Обновляем только изменённые
    const promises = tournamentsToUpdate.map(tournament => {
        const newStatus = nowData > Number(tournament.dateFinish)
            ? 2
            : nowData > Number(tournament.dateStart)
                ? 1
                : tournament.status;

        return UpdatePropTournaments.updateStatus({ ...tournament, status: newStatus });
    });

    const res = await Promise.all(promises);
    //   console.log(`Обновлено турниров: ${res.length}`);
};



const formatData = (data) => {
    const date = new Date(data * 1000);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('ru-RU', options);
    return formattedDate
}
module.exports = {
    updateStatusTournaments,
    formatData
}