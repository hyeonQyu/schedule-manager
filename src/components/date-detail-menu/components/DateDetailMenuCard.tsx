import React, { CSSProperties, Touch, TouchEventHandler, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../DateDetailMenu.scss';
import Card from '@components/common/card/Card';
import { Position, Schedule } from '@defines/defines';
import ScheduleModifyModalStore from '@components/schedule-modal/store/ScheduleModifyModalStore';

const cx = classNames.bind(style);

export interface DateDetailMenuCardProps {
    schedule: Schedule;
}

const DateDetailMenuCard = observer((props: DateDetailMenuCardProps) => {
    const { schedule } = props;
    const scheduleModifyModalStore = ScheduleModifyModalStore.instance;

    const ref = useRef<HTMLDivElement>();
    const [touchStartPosition, setTouchStartPosition] = useState<Position>(null);
    const [style, setStyle] = useState<CSSProperties>({});

    // 카드 관련 상태
    const cardRef = useRef<HTMLButtonElement>();
    const [cardStyle, setCardStyle] = useState<CSSProperties>({});
    const [cardMoveRange, setCardMoveRange] = useState(0);

    const getTouchPosition = (touch: Touch): Position => {
        return {
            x: touch.pageX,
            y: touch.pageY,
        };
    };

    const getDiffX = (pos1: Position, pos2: Position): number => {
        return pos1.x - pos2.x;
    };

    const initCardPosition = () => setCardStyle({ right: 0 });

    const initCardPositionWhenTouchOther = (e) => {
        if (!ref.current || !ref.current.contains(e.target)) {
            initCardPosition();
        }
    };

    // 터치 시작
    const onTouchStart: TouchEventHandler = (e) => {
        // 시작 위치 저장
        setTouchStartPosition(getTouchPosition(e.changedTouches[0]));
    };

    // 터치하며 이동중
    const onTouchMove: TouchEventHandler = (e) => {
        if (!cardMoveRange) return;

        const curPosition = getTouchPosition(e.changedTouches[0]);
        const diffX = getDiffX(touchStartPosition, curPosition);

        // 반대방향으로 이동 시 카드 원위치
        if (diffX < 0) {
            initCardPosition();
            return;
        }

        // 터치로 이동한 거리만큼 카드 이동, 최대 이동 거리: 카드 너비 / 10
        setCardStyle({
            right: Math.min(diffX, cardMoveRange),
        });
    };

    // 터치 끝
    const onTouchEnd: TouchEventHandler = (e) => {
        if (!cardMoveRange) return;

        const endPosition = getTouchPosition(e.changedTouches[0]);

        const diffX = getDiffX(touchStartPosition, endPosition);
        // 카드 너비 / 10보다 적게 이동 시 카드 원위치
        if (diffX < cardMoveRange) {
            initCardPosition();
        }
    };

    useEffect(() => {
        if (!cardRef.current) return;
        setStyle({ height: cardRef.current.offsetHeight });
        setCardMoveRange(cardRef.current.offsetWidth / 10);
    }, [cardRef]);

    // 다른 곳 터치 시 카드 원위치
    useEffect(() => {
        window.addEventListener('touchstart', initCardPositionWhenTouchOther);
        return () => window.removeEventListener('touchstart', initCardPositionWhenTouchOther);
    }, []);

    return (
        <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} className={cx('card')} style={style} ref={ref}>
            <Card schedule={schedule} onClick={() => scheduleModifyModalStore.open(schedule)} cardRef={cardRef} style={cardStyle} />
            <button className={cx('delete')} />
        </div>
    );
});

export default DateDetailMenuCard;
