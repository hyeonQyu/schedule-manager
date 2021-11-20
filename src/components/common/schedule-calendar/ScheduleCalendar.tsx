import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './ScheduleCalendar.scss';
import ScheduleCalendarHeader from '@components/common/schedule-calendar/componenets/ScheduleCalendarHeader';

const cx = classNames.bind(style);

export interface ScheduleCalendarProps {}

const ScheduleCalendar = observer(() => {
    return (
        <div className={cx('wrapper')}>
            <ScheduleCalendarHeader />
            <div className={cx('days')}>
                <span>SUN</span>
                <span>MON</span>
                <span>TUE</span>
                <span>WEN</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
            </div>
        </div>
    );
});

export default ScheduleCalendar;
