import React, { useEffect, useState } from 'react';
import '../styles/ModalAlert.css';

interface ModalAlertProps {
    text: string;
    visible: boolean;
    duration?: number; // сколько показывать после окончания (в мс)
    onDone?: () => void;
}

export const ModalAlert: React.FC<ModalAlertProps> = ({ text, visible, duration = 1000, onDone }) => {
    const [showClass, setShowClass] = useState(false);

    useEffect(() => {
        if (visible) {
            setShowClass(true); // показать
        } else {
            // подождать перед скрытием, чтобы сработал fade-out
            const timeout = setTimeout(() => setShowClass(false), duration);
            return () => clearTimeout(timeout);
        }
    }, [visible, duration]);

    return showClass ? (
        <div className={`top-alert-modal ${visible ? 'show' : ''}`}>
            {text}
        </div>
    ) : null;
};