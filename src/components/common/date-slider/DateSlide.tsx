import React from 'react';
import classNames from 'classnames/bind';
import style from './DateSlide.scss';
import { observer } from 'mobx-react-lite';
import WeeklyScheduleStore from '@stores/WeeklyScheduleStore';

const cx = classNames.bind(style);

const store = WeeklyScheduleStore.instance;

const DateSlide = observer(() => {
    const { thisWeekDateList, toPrevWeek, toNextWeek } = store;
    const todayDate = new Date().getDate();

    return (
        <div className={cx('wrapper')}>
            <button onClick={toPrevWeek}>&lt;</button>
            <div className={cx('dates-container')}>
                {thisWeekDateList.map(({ date }) => (
                    <div className={cx('dates', todayDate === date && 'today')} key={date}>
                        {date}
                    </div>
                ))}
            </div>
            <button onClick={toNextWeek}>&gt;</button>
        </div>
    );
});

export default DateSlide;
