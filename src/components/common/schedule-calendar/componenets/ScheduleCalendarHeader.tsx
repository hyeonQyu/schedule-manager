import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../ScheduleCalendar.scss';
import ScheduleCalendarYearSelect from '@components/common/schedule-calendar/componenets/ScheduleCalendarYearSelect';
import ScheduleCalendarMonthSelect from '@components/common/schedule-calendar/componenets/ScheduleCalendarMonthSelect';
import ArrowIcon from '@icons/arrow/ArrowIcon';
import { EArrowDirection } from '@defines/defines';

const cx = classNames.bind(style);

export interface ScheduleCalendarHeaderProps {}

const ScheduleCalendarHeader = observer(() => {
    return (
        <div className={cx('header')}>
            <ArrowIcon direction={EArrowDirection.LEFT} />
            <div>
                <ScheduleCalendarYearSelect />
                <ScheduleCalendarMonthSelect />
            </div>
            <ArrowIcon direction={EArrowDirection.RIGHT} />
        </div>
    );
});

export default ScheduleCalendarHeader;
