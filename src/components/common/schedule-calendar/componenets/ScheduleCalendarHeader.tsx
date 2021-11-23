import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../ScheduleCalendar.scss';
import ScheduleCalendarYearSelect from '@components/common/schedule-calendar/componenets/ScheduleCalendarYearSelect';
import ScheduleCalendarMonthSelect from '@components/common/schedule-calendar/componenets/ScheduleCalendarMonthSelect';
import ArrowIcon from '@icons/arrow/ArrowIcon';
import { EArrowDirection } from '@defines/defines';
import ScheduleCalendarStore from '@components/common/schedule-calendar/store/ScheduleCalendarStore';

const cx = classNames.bind(style);

const store = ScheduleCalendarStore.instance;

const ScheduleCalendarHeader = observer(() => {
    const { toNextMonth, toPrevMonth } = store;

    return (
        <div className={cx('header')}>
            <ArrowIcon direction={EArrowDirection.LEFT} onClick={toPrevMonth} />
            <div>
                <ScheduleCalendarYearSelect />
                <ScheduleCalendarMonthSelect />
            </div>
            <ArrowIcon direction={EArrowDirection.RIGHT} onClick={toNextMonth} />
        </div>
    );
});

export default ScheduleCalendarHeader;
