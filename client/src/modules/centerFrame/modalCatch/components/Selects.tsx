
import '../styles/Selects.css'
import React, { useMemo } from 'react'
interface Props {
    options: { value: number, text: string }[],
    name: string,
    nameState: string,
    empty: boolean,
    selected: string,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>, name: string) => void
}
export const Selects: React.FC<Props> = ({ options, name, empty, selected, nameState, onChange }) => {

    const option = useMemo(() => options.map(e => (<option key={e.value + e.text} className='option' value={e.value}>{e.text}</option>)), [options])

    return (
        <div className="rows_card_tour">
            <div className="name_car_tour">{name}</div>
            <select className="select" value={selected} onChange={(event) => onChange(event, nameState)}>
                {empty && <option className='option' value=""></option>}
                {option}
            </select>
        </div>
    )
}