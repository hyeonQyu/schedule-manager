import React from 'react';
import classNames from 'classnames/bind';
import style from './DateSlide.scss';
import { observer } from 'mobx-react-lite';
import WeeklyScheduleStore from '@stores/WeeklyScheduleStore';

const cx = classNames.bind(style);

const store = WeeklyScheduleStore.instance;

const DateSlide = observer(() => {
    const { thisWeekDateList } = store;
    const todayDate = new Date().getDate();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('dates-container')}>
                {thisWeekDateList.map((value) => (
                    <div className={todayDate === value.date ? cx('today') : cx('dates')} key={value.date}>
                        {value.date}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default DateSlide;
