const { UpdatePropTournaments } = require('../modules/UpdatePropTournaments')

const updateStatusTournaments = async () => {
    const nowData = Math.floor((new Date().getTime()) / 1000)
    const tournaments = await UpdatePropTournaments.getTournaments()
    const updateStatusTournaments = tournaments.map(e => {
        const currentStatus = nowData > Number(e.dateFinish) ? 2 : nowData > Number(e.dateStart) ? 1 : e.status
        return { ...e, status: currentStatus }
    })
    const promises = updateStatusTournaments.map(async e => { return await UpdatePropTournaments.updateStatus(e) })
    const res = await Promise.all(promises)
}



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