import React from 'react';
import DatePicker from 'react-datepicker';
import { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerInputProps {
    label: string;
    flag: boolean
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void
}


const DataPickerInput: React.FC<DatePickerInputProps> = ({ label, flag, selectedDate, onDateChange }) => {
    const [isDisabled, setIsDisabled] = useState(true);

    const handler = () => {
        setIsDisabled(prev => !prev)
    }

    const dateClass = flag ? 'datas' : 'datas_add_tour'
    const textAlignStyle = flag ? 'left' : 'center'
    return (<div className="rows_card_tour">
        <div className="name_car_tour" style={{ textAlign: textAlignStyle }}>{label}</div>
        <div className={dateClass}><DatePicker placeholderText='дд.мм.гггг'
            className="input_card_tour_picker"
            selected={selectedDate}
            onChange={onDateChange}
            dateFormat="dd/MM/yyyy"
            disabled={flag ? isDisabled : !isDisabled}
        />
            {flag && <div className="btn_name_change" onClick={handler}></div>}</div>
    </div>)

}
export default DataPickerInput