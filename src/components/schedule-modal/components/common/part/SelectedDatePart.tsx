import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../../../ScheduleModal.scss';
import ScheduleAddModalStore from '@components/schedule-modal/store/ScheduleAddModalStore';
import { dayList } from '@defines/defines';

const cx = classNames.bind(style);

const store = ScheduleAddModalStore.instance;

const SelectedDatePart = observer(() => {
    const { selectedDate } = store;
    const { year, month, date } = selectedDate;
    const day = new Date(year, month - 1, date).getDay();

    return (
        <div className={cx('part')}>
            <h4>선택한 날짜</h4>
            <p>
                {year}. {month}. {date} ({dayList[day]})
            </p>
        </div>
    );
});

export default SelectedDatePart;
