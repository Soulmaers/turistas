import React, { useRef, useEffect } from 'react'
import './ModalTwoLauout.css'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, update_modal, set_add_tour, set_subMenu, set_profil, add_catch, set_bigfish } from '../../../GlobalStor';

interface ModalProps {
    children: React.ReactNode;
    style: {
        top: string;
    };
    onClose: (isVisible: boolean) => void;
}
const ModalTwoLauout = ({ children, style, onClose }: ModalProps) => {

    const dispatch = useDispatch()
    const modalka = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalka.current && !modalka.current.contains(event.target as Node)) {
                event.stopPropagation()
                console.log('тут?')
                onClose(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [onClose])


    return (
        <>
            <div className="background_two"></div>
            <div className="modal_window_two" ref={modalka} style={{ top: style.top }}>
                {children}
            </div>
        </>
    )
}


export default ModalTwoLauout