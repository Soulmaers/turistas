
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

    const classes = name === 'ВРЕМЯ СУТОК' ? 'rows_card_tour_catch hadl_enter' : 'rows_card_tour_catch'
    return (
        <div className={classes}>
            {name === 'ВРЕМЯ СУТОК' && <div className="name_title_option">{name}</div>}
            <select className="select" value={selected} onChange={(event) => onChange(event, nameState)}>
                {empty && <option className='option' value=""></option>}
                {option}
            </select>
        </div>
    )
}