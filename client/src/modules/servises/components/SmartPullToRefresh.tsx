import React, { useRef, useState } from 'react';

interface CustomPullToRefreshProps {
    onRefresh: () => Promise<void>;
    children: React.ReactNode;
}

export const SmartPullToRefresh: React.FC<CustomPullToRefreshProps> = ({ onRefresh, children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const startY = useRef(0);
    const startX = useRef(0);
    const [pullDistance, setPullDistance] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [locked, setLocked] = useState(false); // заблокировать, если свайп вбок

    const MAX_PULL = 180; // Максимальный pull
    const THRESHOLD = 60; // Порог, после которого начинается refresh

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (containerRef.current?.scrollTop !== 0) return;

        startY.current = e.touches[0].clientY;
        startX.current = e.touches[0].clientX;
        setLocked(false);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (refreshing || locked) return;
        if (containerRef.current?.scrollTop !== 0) return;

        const currentY = e.touches[0].clientY;
        const currentX = e.touches[0].clientX;
        const deltaY = currentY - startY.current;
        const deltaX = Math.abs(currentX - startX.current);

        if (deltaX > deltaY) {
            setLocked(true); // свайп вбок — выходим
            return;
        }

        if (deltaY > 0) {
            e.preventDefault();
            setPullDistance(Math.min(deltaY, MAX_PULL));
        }
    };

    const handleTouchEnd = async () => {
        if (refreshing || locked) return;

        if (pullDistance > THRESHOLD) {
            setRefreshing(true);
            await onRefresh();
        }

        setPullDistance(0);
        setRefreshing(false);
    };

    return (
        <div

            ref={containerRef}
            style={{

                width: '100%',
                height: '100%',
                WebkitOverflowScrolling: 'touch'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >{refreshing && (
            <div className="lo"
                style={{
                    position: 'absolute',
                    top: '40px',
                    left: '50%',
                    transform: 'translate(-50%,0)',
                    textAlign: 'center',
                    padding: '10px',
                    zIndex: 1

                }}
            > <div className="update_loader"></div>
                <span style={{ color: '#fff' }}>Обновление ...</span>
            </div>
        )}
            <div className="testov"
                style={{
                    width: '100%',
                    transform: `translateY(${pullDistance}px)`,
                    transition: refreshing ? 'transform 0.2s ease' : 'none'
                }}
            >
                {children}
            </div>
        </div >
    );
};
