import React, { CSSProperties, MutableRefObject } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Card.scss';
import { dayList, Schedule } from '@defines/defines';
import Shortening from '@components/common/shortening/Shortening';
import { NumberFormatUtil } from '@utils/NumberFormatUtil';

const cx = classNames.bind(style);

export interface CardProps {
    schedule: Schedule;
    className?: string;
    onClick?: () => void;
    cardRef?: MutableRefObject<HTMLButtonElement>;
    style?: CSSProperties;
}

const Card = observer((props: CardProps) => {
    const { schedule, className = '', onClick = () => {}, cardRef, style } = props;
    const { scheduleDate, startTime, endTime, name, location = '' } = schedule;

    const { year } = scheduleDate;
    const month = NumberFormatUtil.withDigitLength(scheduleDate.month, 2);
    const date = NumberFormatUtil.withDigitLength(scheduleDate.date, 2);
    const day = dayList[new Date(year, scheduleDate.month - 1, scheduleDate.date).getDay()];

    const startHour = NumberFormatUtil.withDigitLength(startTime.hour, 2);
    const startMinute = NumberFormatUtil.withDigitLength(startTime.minute, 2);
    const endHour = NumberFormatUtil.withDigitLength(endTime.hour, 2);
    const endMinute = NumberFormatUtil.withDigitLength(endTime.minute, 2);

    return (
        <button className={classNames(cx('wrapper'), className)} onClick={onClick} ref={cardRef} style={style}>
            <h3>{name}</h3>
            <div className={cx('detail')}>
                <div className={cx('period')}>
                    {year}.{month}.{date}({day}) {startHour}:{startMinute} ~ {endHour}:{endMinute}
                </div>
                <div className={cx('location')}>
                    <Shortening style={{ fontSize: '60%' }}>{location}</Shortening>
                </div>
            </div>
        </button>
    );
});

export default Card;
