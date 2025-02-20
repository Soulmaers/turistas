import { BigFish } from '../../../../GlobalStor'
import React from 'react'

const DiscriptionBigFish: React.FC<BigFish> = (props) => {
    const { name_user, name_bait, name_day, name_fish, name_reservour, name_type, weight, data } = props

    return (
        <div className="log_big">
            <div className="discription_big_fish"><span className='text_bigfish value_name'>Участник:</span><span className='text_bigfish value_text'>{name_user}</span> </div>
            <div className="discription_big_fish"><span className='text_bigfish value_name'>Вид рыбы:</span><span className='text_bigfish value_text'>{name_fish}</span></div>
            <div className="discription_big_fish"><span className='text_bigfish value_name'>Вес:</span><span className='text_bigfish value_text'>{weight} грамм</span></div>
            <div className="discription_big_fish"><span className='text_bigfish value_name'>Водоём:</span><span className='text_bigfish value_text'>{name_reservour}</span></div>
            <div className="discription_big_fish"><span className='text_bigfish value_name'>Дата улова:</span><span className='text_bigfish value_text'>{data}</span></div>
            <div className="discription_big_fish"><span className='text_bigfish value_name'>Тип ловли:</span><span className='text_bigfish value_text'>{name_type}</span> </div>
            <div className="discription_big_fish"><span className='text_bigfish value_name'>Приманка:</span><span className='text_bigfish value_text'>{name_bait}</span></div>
        </div>
    )
}


export default DiscriptionBigFish