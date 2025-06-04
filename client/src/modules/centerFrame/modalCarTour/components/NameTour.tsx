
import { useState } from "react"

interface nameTourProps {
    name: string
    flag: boolean
    updateTourTitle: (newName: string) => void;
}

export const NameTour: React.FC<nameTourProps> = ({ name, flag, updateTourTitle }) => {

    const [nameTour, setNameTour] = useState(name)
    const [isDisabled, setIsDisabled] = useState(true);

    const handler = () => {
        // Изменяем состояние isDisabled на противоположное
        if (!isDisabled) {
            return
        }
        else {
            setIsDisabled(prevState => !prevState);
        }

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameTour(event.target.value); // обновляем состояние с новым значением
        updateTourTitle(event.target.value);
    }
    const parentClass = flag ? 'name_wrapper' : 'add_name_wrapper'
    const width = flag ? '85%' : '100%'
    return (<div className={parentClass}>
        {!flag && <div className="name_car_tour">НАЗВАНИЕ ТУРНИРА</div>}
        <input className="input_name_tour" value={nameTour} disabled={flag ? isDisabled : !isDisabled}
            onChange={handleChange} style={{ width }} />
        {flag && <div className="btn_name_change" onClick={handler}></div>}
    </div>)
}