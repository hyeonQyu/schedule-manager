import React from 'react';
import classNames from 'classnames/bind';
import style from './DateSlide.scss';
import { EWeek } from '@defines/defines';

const cx = classNames.bind(style);

const DateSlide = () => {
    return (
        <div className={cx('wrapper')}>
            {Array.from(Array(EWeek.DATES_PER_WEEK), (e, i) => {
                return (
                    <div className={cx('dates')} key={i}>
                        {i}
                    </div>
                );
            })}
        </div>
    );
};

export default DateSlide;
