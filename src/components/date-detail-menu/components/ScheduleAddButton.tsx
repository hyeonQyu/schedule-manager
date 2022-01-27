import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../DateDetailMenu.scss';
import ScheduleAddModalStore from '@components/schedule-modal/store/ScheduleAddModalStore';
import ScheduleCalendarStore from '@components/schedule-calendar/store/ScheduleCalendarStore';

const cx = classNames.bind(style);

const calendarStore = ScheduleCalendarStore.instance;
const scheduleAddModalStore = ScheduleAddModalStore.instance;

const ScheduleAddButton = observer(() => {
    return (
        <button
            className={cx('button--add')}
            onClick={() => {
                scheduleAddModalStore.open(calendarStore.selectedCalendarDate);
            }}
        />
    );
});

export default ScheduleAddButton;
