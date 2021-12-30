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
    const { curMonth, selectCalendarDate, selectedCalendarDate, setCurYear, setCurMonth, todayCalendarDate } = store;

    const { date, month, year } = calendarDate;

    const isSameDate = (calendarDate: CalendarDate) => {
        if (!calendarDate) return false;
        return calendarDate.date === date && calendarDate.month === month && calendarDate.year === year;
    };

    const disabled = curMonth !== month;
    const selected = isSameDate(selectedCalendarDate);
    const today = isSameDate(todayCalendarDate);

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
        <div
            className={cx('date', disabled && 'disabled', selected && 'selected', today && 'today', selectedCalendarDate && 'size-down')}
            onClick={onClickDateCell}
        >
            <div>
                <div className={cx('text')}>{date}</div>
            </div>
        </div>
    );
});

export default ScheduleCalendarDateCell;
