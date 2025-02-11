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


module.exports = {
    updateStatusTournaments
}