
import React from 'react';

interface CustomInputProps {
    value?: string;
    onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
    ({ value, onClick }, ref) => {
        return (
            <input
                placeholder="дд.мм.гггг"
                type="text"
                className="calendar_time"
                onClick={onClick} // это нужно, чтобы открывался календарь!
                value={value}
                readOnly
                ref={ref}
            />
        );
    }
);

CustomInput.displayName = 'CustomInput';