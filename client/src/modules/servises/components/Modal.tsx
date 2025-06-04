import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

import { useSelector, useDispatch } from 'react-redux';
import { set_tour, set_catch, set_activeModalLevel, set_stateModalWindow, RootState } from '../../../GlobalStor';


interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    style: React.CSSProperties;
}

const Modal = ({ children, onClose, style }: ModalProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const activeModalLevel = useSelector((state: RootState) => state.slice.activeModalLevel);

    useEffect(() => {
        if (activeModalLevel !== 1) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeModalLevel, onClose]);

    return createPortal(
        <div className="modal-backdrop" style={{ zIndex: 100 }}>
            <div className="modal-content" ref={ref} style={style}>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;

