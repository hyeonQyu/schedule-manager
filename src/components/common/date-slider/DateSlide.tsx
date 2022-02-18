import React from 'react';
import classNames from 'classnames/bind';
import style from './DateSlide.scss';
import { observer } from 'mobx-react-lite';
import WeeklyScheduleStore from '@stores/WeeklyScheduleStore';
import { DateUtil } from '@utils/DateUtil';

const cx = classNames.bind(style);

const store = WeeklyScheduleStore.instance;

const DateSlide = observer(() => {
    const { thisWeekDateList, toPrevWeek, toNextWeek } = store;
    const todayDate = new Date().getDate();

    return (
        <div className={cx('wrapper')}>
            <button onClick={toPrevWeek}>&lt;</button>
            <div className={cx('dates-container')}>
                {thisWeekDateList.map((value) => (
                    <div className={cx('dates', todayDate === value.date && 'today')} key={value.date}>
                        {value.date}
                    </div>
                ))}
            </div>
            <button onClick={toNextWeek}>&gt;</button>
        </div>
    );
});

export default DateSlide;
