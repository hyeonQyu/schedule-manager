import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../../../ScheduleModal.scss';
import { CalendarDate, dayList } from '@defines/defines';

const cx = classNames.bind(style);

export interface SelectedDatePartProps {
    selectedDate: CalendarDate;
}

const SelectedDatePart = observer((props: SelectedDatePartProps) => {
    const { selectedDate } = props;
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
