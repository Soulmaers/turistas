import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useDispatch } from 'react-redux';
import { goBackState } from '../../../GlobalStor';

interface Props {
    renderScreen: (body: string) => JSX.Element | null;
    prevBody: string | null;
    statebody: string;
}

export const SwipeWrapper: React.FC<Props> = ({ renderScreen, prevBody, statebody }) => {
    const dispatch = useDispatch();
    const [translateX, setTranslateX] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [fixedPrevBody, setFixedPrevBody] = useState<string | null>(null);

    const isAtRoot = statebody === 'startwindow' || !prevBody;

    const handlers = useSwipeable({
        onSwiping: ({ dir, deltaX }) => {
            if (isAtRoot) return;
            if (dir === 'Right') {
                setFixedPrevBody(prevBody); // зафиксировали экран
                setTranslateX(deltaX);
            }
        },
        onSwipedRight: ({ deltaX }) => {
            if (isAtRoot) return;
            if (deltaX > 100) {
                setIsAnimating(true);
                setTranslateX(window.innerWidth);

                setTimeout(() => {
                    dispatch(goBackState());
                    setTranslateX(0);
                    setIsAnimating(false);
                    setFixedPrevBody(null);
                }, 200);
            } else {
                setTranslateX(0);
            }
        },
        onSwiped: () => {
            if (!isAnimating) {
                setTranslateX(0);
            }
        },
        trackTouch: true,
        trackMouse: true,
    });

    const currentStyle: React.CSSProperties = {
        transform: `translateX(${translateX}px)`,
        transition: isAnimating ? 'transform 0.2s ease-out' : 'none',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 2,
    };

    const prevStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <div {...handlers} className={statebody} style={currentStyle}>
                {renderScreen(statebody)}
            </div>
            {fixedPrevBody && (
                <div className={fixedPrevBody} style={prevStyle}>
                    {renderScreen(fixedPrevBody)}
                </div>
            )}

        </div>
    );
};
