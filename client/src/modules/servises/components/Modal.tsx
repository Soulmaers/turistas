import React, { useRef, useEffect } from 'react'
import './Modal.css'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, update_modal, set_add_tour, set_subMenu, set_profil, add_catch, set_bigfish } from '../../../GlobalStor';

interface ModalProps {
    children: React.ReactNode;
    style: {
        top: string;
    };
    onClose: () => void; // <-- добавляем onClose
}
const Modal = ({ children, style, onClose }: ModalProps) => {
    const deleteFormTour = useSelector((state: RootState) => state.slice.deleteFormTour);
    const dispatch = useDispatch()
    const modalka = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalka.current && !modalka.current.contains(event.target as Node)) {
                console.log(modalka.current)
                console.log('тут?')
                if (!deleteFormTour) onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [onClose])


    return (
        <>
            <div className="background"></div>
            <div className="modal_window" ref={modalka} style={{ top: style.top }}>
                {children}
            </div>
        </>
    )
}


export default Modal