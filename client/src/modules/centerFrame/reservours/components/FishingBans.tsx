import React from 'react'
import '../styles/FishingBans.css'


interface DiscrProps {
    disc: string[]
}
const FishingBans: React.FC<DiscrProps> = ({ disc }) => {

    const rows = disc.map(e => <li className="discription_bans">{e}</li>)

    return (

        <div className="bans_card">
            <div className="bans">Запреты</div>
            <ul className="bans_disc">{rows}</ul>
            <div className="norma">Суммарная суточная норма вылова для всех видов рыб и водных обитателей — кроме рапаны и карася —
                составляет не более 5 кг или 1 экземпляр в случае, если его вес превышает 5 кг.
                Добыча водных биоресурсов разрешается в размере не более одной суточной нормы при пребывании на водном объекте в течение суток.
                Если вы остались у водоема дольше одного дня — неважно, пару дней или неделю — вам разрешено поймать не больше двух суточных норм</div>
        </div>)
}

export default FishingBans


