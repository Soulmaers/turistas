import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './ModalTwoLauout.css';

import { useSelector, useDispatch } from 'react-redux';
import { set_tour, set_catch, set_activeModalLevel, set_stateModalWindow, RootState } from '../../../GlobalStor';


interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    style: React.CSSProperties;
}

const ModalTwoLauout = ({ children, onClose, style }: ModalProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const activeModalLevel = useSelector((state: RootState) => state.slice.activeModalLevel);

    useEffect(() => {
        // if (activeModalLevel !== 4) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return createPortal(
        <div className="background_two" style={{ zIndex: 100 }}>
            <div className="modal_window_two" ref={ref} style={style}>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default ModalTwoLauout;