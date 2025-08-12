import React, { useState, useRef, useEffect } from 'react';
import '../styles/Selects.css';

interface Option {
    value: number;
    text: string;
}

interface Props {
    options: Option[];
    name: string;
    nameState: string;
    selected: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>, name: string) => void;
}

export const CustomSelect: React.FC<Props> = ({ placeholder, options, name, selected, nameState, onChange }) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [openedViaArrow, setOpenedViaArrow] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const optionClicked = useRef(false);
    const filteredOptions = openedViaArrow
        ? options // не фильтруем
        : options.filter(option =>
            option.text.toLowerCase().includes(search.toLowerCase())
        );

    // закрытие при клике вне
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // установка из selected (только при первом рендере и смене selected)
    useEffect(() => {
        const current = options.find(opt => opt.value.toString() === selected);
        if (current) setSearch(current.text);
    }, [selected, options]);

    // выбор опции
    const handleSelect = (option: Option) => {
        optionClicked.current = true; // <-- Добавлено
        const fakeEvent = { target: { value: option.value.toString() } } as React.ChangeEvent<HTMLSelectElement>;
        onChange(fakeEvent, nameState);
        setSearch(option.text);
        setIsOpen(false);
    };

    const handlerBlur = () => {
        setTimeout(() => {
            if (optionClicked.current) {
                optionClicked.current = false; // сброс флага
                return; // Не сбрасываем, если был клик по опции
            }

            const match = options.find(opt =>
                opt.text.toLowerCase() === search.trim().toLowerCase()
            );

            if (match) {
                const fakeEvent = { target: { value: match.value.toString() } } as React.ChangeEvent<HTMLSelectElement>;
                onChange(fakeEvent, nameState);
                setSearch(match.text);
            } else {
                setSearch('');
                const fakeEvent = { target: { value: '0' } } as React.ChangeEvent<HTMLSelectElement>;
                onChange(fakeEvent, nameState);
            }

            setIsOpen(false);
        }, 100); // даём время onClick
    };


    const classes = name === 'ВРЕМЯ СУТОК' ? 'rows_card_tour_catch hadl_enter' : 'rows_card_tour_catch'
    return (
        <div className={classes} ref={wrapperRef}>
            {name === 'ВРЕМЯ СУТОК' && <div className="name_title_option">{name}</div>}
            <div className="custom-select-input">
                <input className="input_val"
                    type="text"
                    value={search}
                    onClick={() => {
                        setSearch('');
                        setIsOpen(false);
                        setOpenedViaArrow(false);
                    }}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setIsOpen(true);
                        setOpenedViaArrow(false);
                    }}
                    onBlur={handlerBlur}
                    placeholder={placeholder}
                />
                <div className="arrow_container" onClick={() => {
                    setIsOpen(!isOpen);
                    setOpenedViaArrow(true);
                }}>
                    <div className="arrow" /></div>
            </div>
            {isOpen && (
                <div className="custom-select-dropdown">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map(option => (
                            <div
                                key={option.value}
                                className="custom-select-option"
                                onClick={() => handleSelect(option)}
                            >
                                {option.text}
                            </div>
                        ))
                    ) : (
                        <div className="custom-select-option disabled">Ничего не найдено</div>
                    )}
                </div>
            )}
        </div>
    );
};
