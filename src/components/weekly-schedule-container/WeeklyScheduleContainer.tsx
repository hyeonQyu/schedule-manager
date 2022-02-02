import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './WeeklyScheduleContainer.scss';
import Card from '@components/card/Card';
import WeeklyScheduleStore from '@stores/WeeklyScheduleStore';
import UserStore from '@stores/UserStore';
import { dayArray } from '@defines/defines';

const cx = classNames.bind(style);

const weekStore = WeeklyScheduleStore.instance;
const userStore = UserStore.instance;

const WeeklyScheduleContainer = observer(() => {
    const { thisWeekArray, thisWeekSchedule } = weekStore;

    const showSchedule = (year, month, date) => {
        const cardArray = [];
        {
            thisWeekSchedule &&
                thisWeekSchedule.map((schedule) => {
                    if (year === schedule.scheduleDate.year && month === schedule.scheduleDate.month && date === schedule.scheduleDate.date)
                        return cardArray.push(
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
                        );
                });
        }
        return cardArray;
    };

    return (
        <div className={cx('wrapper')}>
            {thisWeekArray.map(({ year, month, date }) => (
                <div key={`${year}.${month}.${date}`}>
                    {showSchedule(year, month, date).length !== 0 && (
                        <>
                            <h2>✔ {`${year}.${month}.${date} (${dayArray[new Date(year, month - 1, date).getDay()]})`}</h2>
                            <div className={cx('schedule-container')}>
                                <div className={cx('schedule-line')} />
                                <div className={cx('schedule-info')}>{showSchedule(year, month, date)}</div>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
});

export default WeeklyScheduleContainer;
