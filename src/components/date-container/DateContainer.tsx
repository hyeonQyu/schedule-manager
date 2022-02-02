import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './DateContainer.scss';
import Card from '@components/card/Card';
import WeeklyScheduleStore from '@stores/WeeklyScheduleStore';
import UserStore from '@stores/UserStore';
import { dayArray } from '@defines/defines';

const cx = classNames.bind(style);

const weekStore = WeeklyScheduleStore.instance;
const userStore = UserStore.instance;

const DateContainer = observer(() => {
    const { thisWeekArray, thisWeekSchedule } = weekStore;

    const showSchedule = () => {
        const cardArray = [];
        {
            thisWeekSchedule &&
                thisWeekSchedule.map((schedule) =>
                    cardArray.push(
                        <Card
                            className={schedule.owner === userStore.userEmail ? cx('my-card') : cx('other-card')}
                            key={schedule.name}
                            schedule={{
                                owner: schedule.owner,
                                scheduleDate: schedule.scheduleDate,
                                startTime: schedule.startTime,
                                endTime: schedule.endTime,
                                name: schedule.name,
                            }}
                        />,
                    ),
                );
        }
        return cardArray;
    };

    return (
        <div className={cx('wrapper')}>
            {thisWeekArray.map(({ year, month, date }) => (
                <div key={`${year}.${month}.${date}`}>
                    <h2>✔ {`${year}.${month}.${date} (${dayArray[new Date(year, month - 1, date).getDay()]})`}</h2>
                    <div className={cx('schedule-container')}>
                        <div className={cx('schedule-line')} />
                        <div className={cx('schedule-info')}>{showSchedule()}</div>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default DateContainer;
