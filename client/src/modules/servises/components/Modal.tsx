import React from 'react'
import './Modal.css'


interface ModalProps {
    children: React.ReactNode
}
const Modal = ({ children }: ModalProps) => {

    return (
        <>
            <div className="background"></div>
            <div className="modal_window">
                {children}
            </div>
        </>
    )
}


export default Modal