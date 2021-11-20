import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './ScheduleCalendar.scss';
import ScheduleCalendarHeader from '@components/common/schedule-calendar/componenets/ScheduleCalendarHeader';
import ScheduleCalendarDates from '@components/common/schedule-calendar/componenets/ScheduleCalendarDates';

const cx = classNames.bind(style);

export interface ScheduleCalendarProps {}

const ScheduleCalendar = observer(() => {
    return (
        <div className={cx('wrapper')}>
            <ScheduleCalendarHeader />
            <div className={cx('days')}>
                <div>일</div>
                <div>월</div>
                <div>화</div>
                <div>수</div>
                <div>목</div>
                <div>금</div>
                <div>토</div>
            </div>
            <ScheduleCalendarDates />
        </div>
    );
});

export default ScheduleCalendar;
