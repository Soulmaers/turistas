import React, { useEffect, useRef, useState } from 'react';
import '../styles/Numeric.css';

interface TimeWheelProps {
    defaultHour?: string;
    defaultMinute?: string;
    onSave: (hour: string, minute: string) => void;
    onClose: () => void;
}

const VISIBLE_ITEMS = 7;
const ITEM_HEIGHT = 30;
const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2);

export const TimeWheel: React.FC<TimeWheelProps> = ({ defaultHour = '00', defaultMinute = '00', onSave, onClose }) => {
    const baseHours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const baseMinutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    // Создаем расширенный список — 3 копии подряд
    const hours = [...baseHours, ...baseHours, ...baseHours, ...baseHours,];
    const minutes = [...baseMinutes, ...baseMinutes, ...baseMinutes];

    const hourRef = useRef<HTMLDivElement>(null);
    const minuteRef = useRef<HTMLDivElement>(null);
    const [hourScroll, setHourScroll] = useState(0);
    const [minuteScroll, setMinuteScroll] = useState(0);
    const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

    // Функция для вычисления позиционирования в расширенном списке
    const getInitialIndex = (listLength: number, value: string, baseList: string[]) => {
        const baseIndex = baseList.indexOf(value);
        // Центральная копия начинается с baseList.length
        return baseList.length + baseIndex;
    };

    const scrollToIndex = (ref: React.RefObject<HTMLDivElement>, index: number) => {
        if (ref.current) {
            ref.current.scrollTop = (index - CENTER_INDEX) * ITEM_HEIGHT;
        }
    };

    useEffect(() => {
        // Изначально скроллим к центральной копии с выбранным значением
        scrollToIndex(hourRef, getInitialIndex(baseHours.length, defaultHour, baseHours));
        scrollToIndex(minuteRef, getInitialIndex(baseMinutes.length, defaultMinute, baseMinutes));
    }, [defaultHour, defaultMinute]);

    // Получить выбранный элемент из базового списка, учитывая цикличность
    const getSelected = (scrollTop: number, baseList: string[]) => {
        const totalLength = baseList.length;
        let index = Math.round(scrollTop / ITEM_HEIGHT) + CENTER_INDEX;
        // Приводим индекс к диапазону базового списка (0..totalLength-1)
        index = ((index % totalLength) + totalLength) % totalLength;
        return baseList[index];
    };

    const handleSave = () => {
        const selectedHour = getSelected(hourScroll, baseHours);
        const selectedMinute = getSelected(minuteScroll, baseMinutes);
        onSave(selectedHour, selectedMinute);
    };

    const handleInfiniteScroll = (
        e: React.UIEvent<HTMLDivElement>,
        setter: React.Dispatch<React.SetStateAction<number>>,
        ref: React.RefObject<HTMLDivElement>,
        baseList: string[]
    ) => {
        const totalLength = baseList.length;
        const extendedLength = totalLength * 3;
        const scrollTop = e.currentTarget.scrollTop;
        setter(scrollTop);

        if (scrollTimeout) clearTimeout(scrollTimeout);

        setScrollTimeout(
            setTimeout(() => {
                if (!ref.current) return;

                const maxScroll = (extendedLength - CENTER_INDEX - 1) * ITEM_HEIGHT;
                const minScroll = (CENTER_INDEX) * ITEM_HEIGHT;

                /*  if (scrollTop < minScroll) {
                      // Если прокрутили слишком вверх — перепрыгиваем в центральную копию
                      const index = Math.round(scrollTop / ITEM_HEIGHT);
                      const newIndex = index + totalLength;
                      ref.current.scrollTop = newIndex * ITEM_HEIGHT;
                      setter(ref.current.scrollTop);
                  } else if (scrollTop > maxScroll) {
                      // Если прокрутили слишком вниз — перепрыгиваем в центральную копию
                      const index = Math.round(scrollTop / ITEM_HEIGHT);
                      const newIndex = index - totalLength;
                      ref.current.scrollTop = newIndex * ITEM_HEIGHT;
                      setter(ref.current.scrollTop);
                  } else {*/
                // Центрируем выбранный элемент
                const index = Math.round(scrollTop / ITEM_HEIGHT);
                const targetIndex = index;
                const targetScrollTop = targetIndex * ITEM_HEIGHT;
                ref.current.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
                //   }
            }, 100)
        );
    };

    const getItemStyle = (index: number, scrollTop: number) => {
        const centerPosition = scrollTop / ITEM_HEIGHT + CENTER_INDEX;
        const distance = Math.abs(index - centerPosition);

        const scale = Math.max(0.7, 1 - distance * 0.15);
        const opacity = Math.max(0.3, 1 - distance * 0.3);
        const translateY = (index - centerPosition) * 10;

        return {
            transform: `scale(${scale}) translateY(${translateY}px)`,
            opacity,
            color: distance < 0.5 ? 'white' : 'lightgray',
            transition: 'transform 0.2s, opacity 0.2s, color 0.2s',
            height: ITEM_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
        };
    };

    return (
        <div className="wheel-backdrop" onClick={onClose}>
            <div className="wheel-container" onClick={e => e.stopPropagation()}>
                <div className="wheel">
                    <div
                        className="wheel-column"
                        ref={hourRef}
                        onScroll={e => handleInfiniteScroll(e, setHourScroll, hourRef, baseHours)}
                    >
                        {hours.map((h, i) => (
                            <div key={`${h}-${i}`} style={getItemStyle(i, hourScroll)}>
                                {h}
                            </div>
                        ))}
                    </div>
                    <div
                        className="wheel-column"
                        ref={minuteRef}
                        onScroll={e => handleInfiniteScroll(e, setMinuteScroll, minuteRef, baseMinutes)}
                    >
                        {minutes.map((m, i) => (
                            <div key={`${m}-${i}`} style={getItemStyle(i, minuteScroll)}>
                                {m}
                            </div>
                        ))}
                    </div>
                    <div className="wheel-center-background" />
                </div>
                <button className="wheel-save" onClick={handleSave}>
                    Записать
                </button>
            </div>
        </div>
    );
};
