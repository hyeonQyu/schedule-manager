import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../DateDetailMenu.scss';
import Card from '@components/common/card/Card';
import { Position, Schedule } from '@defines/defines';
import ScheduleModifyModalStore from '@components/schedule-modal/store/ScheduleModifyModalStore';
import ScheduleCalendarStore from '@components/schedule-calendar/store/ScheduleCalendarStore';
import UserStore from '@stores/UserStore';
import Swipeable from '@components/swipeable/Swipeable';

const cx = classNames.bind(style);

export interface DateDetailMenuCardProps {
    schedule: Schedule;
}

const DateDetailMenuCard = observer((props: DateDetailMenuCardProps) => {
    const { schedule } = props;
    const scheduleModifyModalStore = ScheduleModifyModalStore.instance;
    const scheduleCalendarStore = ScheduleCalendarStore.instance;
    const userStore = UserStore.instance;

    const [style, setStyle] = useState<CSSProperties>({});

    // 카드 관련 상태
    const cardRef = useRef<HTMLButtonElement>();
    const [cardStyle, setCardStyle] = useState<CSSProperties>(userStore.isMe(schedule.owner) ? { background: '#bc80fc', color: 'white' } : {});
    const [cardMoveRange, setCardMoveRange] = useState(0);

    const initCardPosition = () => setCardStyle({ ...cardStyle, right: 0 });

    const moveCard = (diff: Position) => {
        if (!cardMoveRange) return;

        // 반대방향으로 이동 시 카드 원위치
        if (diff.x < 0) {
            initCardPosition();
            return;
        }

        // 터치로 이동한 거리만큼 카드 이동, 최대 이동 거리: 카드 너비 / 10
        setCardStyle({
            ...cardStyle,
            right: Math.min(diff.x, cardMoveRange),
        });
    };

    const locateCard = (diff: Position) => {
        if (!cardMoveRange) return;

        // 카드 너비 / 10보다 적게 이동 시 카드 원위치
        if (diff.x < cardMoveRange) {
            initCardPosition();
        }
    };

    const deleteSchedule = () => scheduleCalendarStore.deleteSchedule(schedule);

    useEffect(() => {
        if (!cardRef.current) return;
        setStyle({ height: cardRef.current.offsetHeight });
        setCardMoveRange(cardRef.current.offsetWidth / 10);
    }, [cardRef]);

    return (
        <Swipeable onTouchMove={moveCard} onTouchEnd={locateCard} onTouchOther={initCardPosition} className={cx('card')} style={style}>
            <Card schedule={schedule} onClick={() => scheduleModifyModalStore.open(schedule)} cardRef={cardRef} style={cardStyle} />
            <button className={cx('delete')} onClick={deleteSchedule} />
        </Swipeable>
    );
});

export default DateDetailMenuCard;
