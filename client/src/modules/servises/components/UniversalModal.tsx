
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import { set_tour, set_catch, setModalStackPush, setModalStackPop, RootState } from '../../../GlobalStor';


export const UniversalModal = ({
    level,
    visible,
    onClose,
    component,
    style,
    onTop = false
}: {
    level: number,
    visible: boolean,
    onClose: () => void,
    component: JSX.Element,
    style: React.CSSProperties,
    onTop?: boolean
}) => {
    const dispatch = useDispatch();
    const modalStack = useSelector((state: RootState) => state.slice.modalStack);
    const ref = useRef<HTMLDivElement>(null);

    // Добавляем/удаляем уровень из стека при монтировании/размонтировании
    useEffect(() => {
        console.log(visible)
        if (visible) {
            dispatch(setModalStackPush(level));
        }
        return () => {
            dispatch(setModalStackPop());
        };
    }, [visible, level, dispatch]);

    // Обработка клика вне модалки только если это верхняя модалка
    useEffect(() => {
        const handler = (event: MouseEvent) => {
            //  console.log(modalStack)
            const topLevel = modalStack.at(-1);
            //  console.log(onTop, topLevel, level)
            if (!onTop && topLevel !== level) return;

            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, [modalStack, level, onTop, onClose]);

    if (!visible) return null;

    return createPortal(
        <div className="modal-backdrop" style={{ zIndex: 100 * level }}>
            <div className="modal-content" ref={ref} style={style}>
                {component}
            </div>
        </div>,
        document.body
    );
};