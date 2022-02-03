import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './ScheduleCalendar.scss';
import ScheduleCalendarHeader from '@components/schedule-calendar/componenets/ScheduleCalendarHeader';
import ScheduleCalendarDates from '@components/schedule-calendar/componenets/ScheduleCalendarDates';
import { dayList } from '@defines/defines';

const cx = classNames.bind(style);

const ScheduleCalendar = observer(() => {
    return (
        <div className={cx('wrapper')}>
            <ScheduleCalendarHeader />
            <div className={cx('days')}>
                {dayList.map((day) => (
                    <div key={day} className={cx('day')}>
                        {day}
                    </div>
                ))}
            </div>
            <ScheduleCalendarDates />
        </div>
    );
});

export default ScheduleCalendar;
