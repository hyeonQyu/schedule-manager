import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '@components/common/schedule-calendar/ScheduleCalendar.scss';
import { CalendarDate } from '@defines/defines';
import ScheduleCalendarStore from '@components/common/schedule-calendar/store/ScheduleCalendarStore';

const cx = classNames.bind(style);

const store = ScheduleCalendarStore.instance;

export interface ScheduleCalendarDateCellProps {
    calendarDate: CalendarDate;
}

const ScheduleCalendarDateCell = observer((props: ScheduleCalendarDateCellProps) => {
    const { calendarDate } = props;
    const { curMonth } = store;

    const { date, month } = calendarDate;
    const disabled = curMonth !== month;

    return (
        <div className={cx('date', disabled && 'disabled')}>
            <p>{date}</p>
        </div>
    );
});

export default ScheduleCalendarDateCell;
