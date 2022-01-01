import React from 'react';
import classNames from 'classnames/bind';
import style from './DateSlider.scss';
import DateSlide from './DateSlide';
import { observer } from 'mobx-react';
import { dayArray } from '@defines/defines';
import { WeekProps } from '@defines/defines';

const cx = classNames.bind(style);

export interface DateSliderProps extends WeekProps {}

const DateSlider = observer((props: DateSliderProps) => {
    const { thisWeekArr } = props;
    return (
        <div className={cx('wrapper')}>
            {/* 요일 */}
            <div className={cx('days')}>
                {dayArray.map((day) => (
                    <div key={day} className={cx('day')}>
                        {day}
                    </div>
                ))}
            </div>
            {/* 일주일 슬라이더 */}
            <DateSlide thisWeekArr={thisWeekArr} />
        </div>
    );
});

export default DateSlider;
