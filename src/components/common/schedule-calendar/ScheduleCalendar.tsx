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
                <div className={cx('day')}>일</div>
                <div className={cx('day')}>월</div>
                <div className={cx('day')}>화</div>
                <div className={cx('day')}>수</div>
                <div className={cx('day')}>목</div>
                <div className={cx('day')}>금</div>
                <div className={cx('day')}>토</div>
            </div>
            <ScheduleCalendarDates />
        </div>
    );
});

export default ScheduleCalendar;
