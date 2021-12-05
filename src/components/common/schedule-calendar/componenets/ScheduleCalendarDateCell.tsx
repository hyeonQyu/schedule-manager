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
    const { curMonth, selectCalendarDate, selectedCalendarDate, setCurYear, setCurMonth } = store;

    const { date, month, year } = calendarDate;
    const disabled = curMonth !== month;
    const selected = (() => {
        if (!selectedCalendarDate) return false;
        return selectedCalendarDate.date === date && selectedCalendarDate.month === month && selectedCalendarDate.year === year;
    })();

    // 날짜 선택
    const onClickDateCell = () => {
        // 비활성화 된 날짜 클릭 시에는 해당 월로 넘어감
        if (disabled) {
            setCurYear(year);
            setCurMonth(month);
        }
        selectCalendarDate(calendarDate);
    };

    return (
        <div className={cx('date', disabled && 'disabled', selected && 'selected', selectedCalendarDate && 'size-down')} onClick={onClickDateCell}>
            <p>
                <span>{date}</span>
            </p>
        </div>
    );
});

export default ScheduleCalendarDateCell;
