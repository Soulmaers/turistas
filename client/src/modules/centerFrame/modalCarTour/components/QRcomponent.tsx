import React, { useRef } from "react";
import QRCode from 'react-qr-code';
import '../styles/QRComponent.css'
interface TournamentQRCodeProps {
    link: string | null;
}

const TournamentQRCode: React.FC<TournamentQRCodeProps> = ({ link }) => {

    const qrRef = useRef<HTMLDivElement>(null); // уточняем тип
    console.log(link)
    if (!link) return null;

    const getEventIdFromLink = (link: string | null): string | null => {
        if (!link) return null;
        try {
            const url = new URL(link);
            return url.searchParams.get("event_id");
        } catch {
            return null;
        }
    };

    const eventId = getEventIdFromLink(link);
    if (!eventId) return <p>Ошибка: ID турнира не найден в переданной ссылке</p>;

    const downloadQRCode = () => {
        if (qrRef.current) {
            const svg = qrRef.current.querySelector("svg") as SVGSVGElement | null;
            if (svg) {
                const serializer = new XMLSerializer();
                const svgString = serializer.serializeToString(svg);
                const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const linkEl = document.createElement('a');
                linkEl.href = url;
                linkEl.download = `tournament_${eventId}_qrcode.svg`;
                linkEl.click();
                URL.revokeObjectURL(url);
            }
        }
    };

    return (
        <div className="qr_container" style={{ textAlign: 'center' }}>
            <div className="qr" ref={qrRef} style={{ display: 'inline-block' }}>
                <QRCode value={link} size={150} level="H" />
            </div>
            <div className="links">
                <div className="link_btn" onClick={() => {
                    if (navigator.share) {
                        navigator.share({
                            title: 'Регистрация на турнир',
                            url: link,
                        }).catch((error) => console.log('Ошибка поделиться', error));
                    } else {
                        // fallback: скопировать ссылку в буфер обмена (с проверкой)
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText(link).then(() => {
                                alert('Ссылка скопирована в буфер обмена');
                            }).catch(err => {
                                console.error("Ошибка при копировании в буфер обмена: ", err);
                                alert('Не удалось скопировать ссылку в буфер обмена. Пожалуйста, скопируйте ее вручную:\n\n' + link);
                            });
                        } else {
                            // Если navigator.clipboard отсутствует или не работает
                            alert('Ваш браузер не поддерживает автоматическое копирование ссылки. Пожалуйста, скопируйте ее вручную:\n\n' + link);
                        }
                    }
                }}>
                    Пригласить по ссылке
                </div>

                <div className="link_btn" onClick={() => {
                    // делимся QR-кодом как изображением
                    if (qrRef.current) {
                        const svg = qrRef.current.querySelector("svg") as SVGSVGElement | null;
                        if (svg && navigator.share) {
                            const serializer = new XMLSerializer();
                            const svgString = serializer.serializeToString(svg);
                            const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
                            const filesArray = [
                                new File([blob], `qrcode_${eventId}.svg`, { type: 'image/svg+xml' }),
                            ];
                            navigator.share({
                                files: filesArray,
                                title: 'QR-код турнира',
                            }).catch((error) => console.log('Ошибка поделиться', error));
                        } else {
                            alert('Поделиться QR-кодом недоступно в этом браузере');
                        }
                    }
                }}>
                    Поделиться QR-кодом
                </div>




            </div>
        </div>
    );
};

export default TournamentQRCode;