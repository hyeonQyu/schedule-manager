import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '@components/schedule-calendar/ScheduleCalendar.scss';
import { CalendarDate, DateInfo } from '@defines/defines';
import ScheduleCalendarStore from '@components/schedule-calendar/store/ScheduleCalendarStore';
import UserStore from '@stores/UserStore';

const cx = classNames.bind(style);

const store = ScheduleCalendarStore.instance;
const userStore = UserStore.instance;

export interface ScheduleCalendarDateCellProps {
    dateInfo: DateInfo;
}

const ScheduleCalendarDateCell = observer((props: ScheduleCalendarDateCellProps) => {
    const { dateInfo } = props;
    const { calendarDate, scheduleList } = dateInfo;
    const { date, month, year } = calendarDate;

    const { curMonth, selectCalendarDate, selectedCalendarDate, setCurYear, setCurMonth, todayCalendarDate } = store;

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
            <ul className={cx(selectedCalendarDate && 'reduced')}>
                {scheduleList?.map(({ name, owner }, i) => (
                    <li key={i} className={cx(userStore.isMe(owner) ? 'me' : 'other')}>
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default ScheduleCalendarDateCell;
