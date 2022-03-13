import React, { CSSProperties, ReactNode, Touch, TouchEventHandler, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { Position } from '@defines/defines';

export interface SwipeableProps {
    /**
     * 터치 시작 시 실행되는 콜백 함수
     * @param startPosition 터치를 시작한 위치 좌표
     */
    onTouchStart?: (startPosition?: Position) => void;
    /**
     * 터치하며 이동중일 때 실행되는 콜백 함수
     * @param diff 시작 위치 - 현재 위치 차이
     * @param curPosition 현재 터치중인 위치
     * @param startPosition 터치를 시작한 위치
     */
    onTouchMove?: (diff: Position, curPosition?: Position, startPosition?: Position) => void;
    /**
     * 터치 종료 시 실행되는 콜백 함수
     * @param diff 시작 위치 - 터치가 끝난 위치 차이
     * @param curPosition 마지막으로 터치한 위치
     * @param startPosition 터치를 시작한 위치
     */
    onTouchEnd?: (diff: Position, curPosition?: Position, startPosition?: Position) => void;
    /**
     * 다른 곳 터치 시 실행되는 콜백 함수
     * @param e
     */
    onTouchOther?: (e?: TouchEvent) => void;
    children?: ReactNode | ReactNode[];
    className?: string;
    style?: CSSProperties;
}

const Swipeable = observer((props: SwipeableProps) => {
    const { children, onTouchOther = () => {}, onTouchStart = () => {}, onTouchMove = () => {}, onTouchEnd = () => {}, className, style } = props;
    const [touchStartPosition, setTouchStartPosition] = useState<Position>(null);
    const ref = useRef<HTMLDivElement>();

    const getTouchPosition = (touch: Touch): Position => {
        return {
            x: touch.pageX,
            y: touch.pageY,
        };
    };

    const getDiff = (pos1: Position, pos2: Position): Position => {
        return {
            x: pos1.x - pos2.x,
            y: pos1.y - pos2.y,
        };
    };

    const touchStart: TouchEventHandler = (e) => {
        const startPosition = getTouchPosition(e.changedTouches[0]);

        // 시작 위치 저장
        setTouchStartPosition(startPosition);
        onTouchStart(startPosition);
    };

    const touchMove: TouchEventHandler = (e) => {
        const curPosition = getTouchPosition(e.changedTouches[0]);
        const diff = getDiff(touchStartPosition, curPosition);

        onTouchMove(diff, curPosition, touchStartPosition);
    };

    const touchEnd: TouchEventHandler = (e) => {
        const endPosition = getTouchPosition(e.changedTouches[0]);
        const diff = getDiff(touchStartPosition, endPosition);

        onTouchEnd(diff, endPosition, touchStartPosition);
    };

    const touchOther = (e) => {
        if (!ref.current || !ref.current.contains(e.target)) {
            onTouchOther(e);
        }
    };

    useEffect(() => {
        window.addEventListener('touchstart', touchOther);
        return () => window.removeEventListener('touchstart', touchOther);
    });

    return (
        <div onTouchStart={touchStart} onTouchMove={touchMove} onTouchEnd={touchEnd} className={className} style={style} ref={ref}>
            {children}
        </div>
    );
});

export default Swipeable;
