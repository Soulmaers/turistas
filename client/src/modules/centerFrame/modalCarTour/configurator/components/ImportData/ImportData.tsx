import './ImportData.css'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, set_stateModalWindowThour, set_stateModalWindowThree } from '../../../../../../GlobalStor';
import React, { useRef } from 'react';

export const ImportData = () => {
    const dispatch = useDispatch();
    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);

    // создаём ref для скрытого input
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const over = () => {
        dispatch(set_stateModalWindowThree({ ...stateModalWindowThree, status: false }));
    }

    // функция открытия диалога выбора файла
    const openFileDialog = () => {
        fileInputRef.current?.click();
    }

    // обработчик выбора файла
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            // здесь можно обработать выбранный файл
            console.log('Выбран файл:', file.name);

        }
    }

    return (
        <div className="modal_subif">
            <div className="title_tour header_modal_add_tour">ИМПОРТ ДАННЫХ</div>
            <div className="body_card_modal">
                <div className="discription_time">Вы можете импортировать данные регламента турнира из файла.</div>
                <div className="discription_time">Для этого скачайте ниже шаблон и заполните по образцу.</div>
                <div className="wrap_row btn_import">СКАЧАТЬ ШАБЛОН</div>
                <div className="flow"></div>
                {/* Кнопка открытия диалога загрузки */}
                <div className="wrap_row_import_card low_load_data" onClick={openFileDialog} style={{ cursor: 'pointer' }}>
                    ЗАГРУЗИТЬ ДАННЫЕ
                </div>

                {/* Скрытый input для выбора файла */}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={onFileChange}
                    accept=".xlsx,.xls,.csv" // например, разрешить только файлы Excel или CSV
                />
            </div>

            <div className="footer_ok" onClick={over}>OK</div>
        </div>
    );
}
