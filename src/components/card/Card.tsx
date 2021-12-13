import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Card.scss';
import { Schedule } from '@defines/defines';
import Shortening from '@components/common/shortening/Shortening';

const cx = classNames.bind(style);

export interface CardProps {
    schedule: Schedule;
    className?: string;
}

const Card = observer((props: CardProps) => {
    const { schedule, className = '' } = props;
    const { startDatetime, endDatetime, name, location = '' } = schedule;

    return (
        <button className={classNames(cx('wrapper'), className)}>
            <h3>{name}</h3>
            <div className={cx('detail')}>
                <div className={cx('period')}>
                    {startDatetime.toString()} ~ {endDatetime.toString()}
                </div>
                <div className={cx('location')}>
                    <Shortening style={{ fontSize: '60%' }}>{location}</Shortening>
                </div>
            </div>
        </button>
    );
});

export default Card;
