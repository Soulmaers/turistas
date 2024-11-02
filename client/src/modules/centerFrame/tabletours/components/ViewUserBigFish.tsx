import React from 'react'
import l from '../../../righFrame/assets/l.webp'
import '../styles/ViewUserBigFish.css'

const ViewUserBigFish = () => {

    const back = { backgroundImage: `url(${l})` };
    return (
        <div className="wins_card">
            <div className="icon" style={back}></div>
            <div className="log_big">
                <div className="discription_big_fish"> BigFish - Судак</div>
                <div className="discription_big_fish"> Вес - 1935 грамм</div>
                <div className="discription_big_fish"> Водоём - Финский залив (Соколинское)</div>
                <div className="discription_big_fish"> Дата - 04.10.2024</div>
                <div className="discription_big_fish"> Тип ловли - Троллинг</div>
                <div className="discription_big_fish"> Приманка - Рудра</div>
            </div>
        </div>
    )
}


export default ViewUserBigFish