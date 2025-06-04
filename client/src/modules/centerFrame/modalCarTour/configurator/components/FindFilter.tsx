import React, { useState, useEffect } from 'react';
import '../styles/FindFilter.css';

interface Fish {
    id: number;
    name: string;
}

interface PropArray {
    disArray: (objs: Fish[]) => void;  // функция для обновления выбранных рыб
    objs: Fish[];                      // весь список рыб
    selected: Fish[];                  // выбранные рыбы из родителя
    disabled: boolean,
    display: string | undefined
}

export const FindFilter: React.FC<PropArray> = ({ disArray, objs, selected, disabled, display }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [vibor, setVibor] = useState<{ id: number, name: string }>({ id: -10000, name: '' })
    // Фильтрация рыб по поисковому запросу (исключая уже выбранных)
    const filteredFishs = objs
        .filter(obj => obj.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(obj => !selected.find(sel => sel.id === obj.id));

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, ''); // разрешаем пробел
        setSearchTerm(value);
        setShowModal(value.trim().length > 0);
        setVibor({ id: -10000, name: value })
    };

    const handleAddFish = () => {
        const trimmed = searchTerm.trim();
        if (trimmed === '') return;

        // Проверка: уже выбрана ли рыба с таким же названием (регистр игнорируем)
        const alreadySelected = selected.some(
            fish => fish.name.trim().toLowerCase() === trimmed.toLowerCase()
        );

        if (alreadySelected) {
            // Можно отобразить ошибку или просто выйти
            alert('Такое название уже есть');
            return;
        }

        const isSame = trimmed === vibor.name.trim();
        const newFish = isSame && vibor.id !== -10000
            ? vibor
            : { id: Date.now() * -1, name: trimmed };

        disArray([...selected, newFish]);

        setSearchTerm('');
        setVibor({ id: -10000, name: '' });
        setShowModal(false);
    };

    const handleSelectFish = (obj: Fish) => {
        setSearchTerm(obj.name);
        setVibor(obj)
        setShowModal(false);
    };

    return (
        <div className="find-filter">
            <div className="input-wrapper" >
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
                    style={{ display: display }}
                />
            </div>

            {showModal && filteredFishs.length > 0 && (
                <div className="modal">
                    <ul>
                        {filteredFishs.map(obj => (
                            <li key={obj.id} onClick={() => handleSelectFish(obj)}>
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
