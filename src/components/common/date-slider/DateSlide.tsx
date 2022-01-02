import React from 'react';
import classNames from 'classnames/bind';
import style from './DateSlide.scss';
import { observer } from 'mobx-react-lite';
import WeeklyScheduleStore from '@stores/WeeklyScheduleStore';

const cx = classNames.bind(style);

const store = WeeklyScheduleStore.instance;

const DateSlide = observer(() => {
    const { thisWeekArr } = store;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('dates-container')}>
                {thisWeekArr.map((value, i) => (
                    <div className={cx('dates')} key={`date-${i}`}>
                        {value.date}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default DateSlide;
