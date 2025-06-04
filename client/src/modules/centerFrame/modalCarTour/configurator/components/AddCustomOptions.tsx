import '../styles/AddCustomOptions.css'
import React, { useState, useEffect } from 'react';



interface Obj {
    id: number;
    name: string;
}

interface PropArray {
    disArray: React.Dispatch<React.SetStateAction<Obj[]>>;
    disabled: boolean,
    display: string | undefined
}


export const AddCustomOptions: React.FC<PropArray> = ({ disArray, disabled, display }) => {
    const [searchTerm, setSearchTerm] = useState('');


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, ''); // разрешаем пробел
        setSearchTerm(value);

    };


    const handleAddFish = () => {
        const trimmed = searchTerm.trim();
        if (trimmed !== '') {
            // Генерируем уникальный id для новой рыбы (например, отрицательное число)
            const newId = Date.now() * -1;
            const newFish = { id: newId, name: trimmed };
            disArray((prev) => [...prev, newFish]);
        }
        setSearchTerm('');

    };
    return (<div className="input-wrapper">
        <input
            type="text"
            placeholder="добавьте свой вариант"
            value={searchTerm}
            onChange={handleInputChange}
            disabled={disabled}
        />
        <div
            className="add-button"
            onClick={handleAddFish}
            title="Добавить новую рыбу"
            style={{ display }}
        />
    </div>)
}