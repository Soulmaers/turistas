import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerInputProps {
    label: string;
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void
}


const DataPickerInput: React.FC<DatePickerInputProps> = ({ label, selectedDate, onDateChange }) => {


    return (<div className="rows_card_tour">
        <div className="name_car_tour">{label}</div>
        <DatePicker
            className="input_card_tour_picker"
            selected={selectedDate}
            onChange={onDateChange}
            dateFormat="dd/MM/yyyy"
        />
    </div>)

}
export default DataPickerInput