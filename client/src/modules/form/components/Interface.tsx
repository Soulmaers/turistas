



interface Tournament {
    status: number | undefined | null,
    big_fish: number | null,
    name: string,
    created_by: number,
    dateStart: string,
    dateFinish: string,
    id: number
}
export interface User {
    user: {
        contactID: '',
        name_user: 'string',
        trophys: number,
        fishs: number,
        stars: number,
        id: number,
    } | null,
    tournament: Tournament[]

}