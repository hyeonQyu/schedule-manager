import React from 'react';
import classNames from 'classnames/bind';
import style from './DateSlider.scss';
import DateSlide from './DateSlide';
import { observer } from 'mobx-react';
import { dayList } from '@defines/defines';

const cx = classNames.bind(style);

const DateSlider = observer(() => {
    return (
        <div className={cx('wrapper')}>
            {/* 요일 */}
            <div className={cx('days')}>
                {dayList.map((day) => (
                    <div key={day} className={cx('day')}>
                        {day}
                    </div>
                ))}
            </div>
            {/* 일주일 슬라이더 */}
            <DateSlide />
        </div>
    );
});

export default DateSlider;
