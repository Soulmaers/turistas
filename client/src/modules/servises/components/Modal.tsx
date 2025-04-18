import React, { useRef, useEffect } from 'react'
import './Modal.css'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, update_modal, set_subMenu, set_profil, set_tour, set_bigfish } from '../../../GlobalStor';

interface ModalProps {
    children: React.ReactNode
    style: {
        top: string
    }
}
const Modal = ({ children, style }: ModalProps) => {

    const dispatch = useDispatch()
    const modalka = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalka.current && !modalka.current.contains(event.target as Node)) {
                console.log('тут?')
                dispatch(update_modal(false))
                dispatch(set_subMenu(null))
                dispatch(set_profil(false))
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [])


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