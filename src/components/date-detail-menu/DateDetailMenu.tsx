import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './DateDetailMenu.scss';
import ScheduleCalendarStore from '@components/common/schedule-calendar/store/ScheduleCalendarStore';

const cx = classNames.bind(style);

const calendarStore = ScheduleCalendarStore.instance;

export interface DateDetailMenuProps {}

const DateDetailMenu = observer(() => {
    const { selectedCalendarDate } = calendarStore;

    return <div className={cx('wrapper', selectedCalendarDate && 'open')} />;
});

export default DateDetailMenu;
