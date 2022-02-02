import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './DateContainer.scss';
import Card from '@components/card/Card';
import WeeklyScheduleStore from '@stores/WeeklyScheduleStore';
import UserStore from '@stores/UserStore';

const cx = classNames.bind(style);

const weekStore = WeeklyScheduleStore.instance;
const userStore = UserStore.instance;

const DateContainer = observer(() => {
    const { thisWeekArray, thisWeekSchedule } = weekStore;

    const sortSchedule = (a, b) => {
        const dateA = new Date(a.scheduleDate).getTime();
        const dateB = new Date(b.scheduleDate).getTime();
        return dateA > dateB ? -1 : 1;
    }

    const showSchedule = () => {
        const cardArray = [];
        {
            thisWeekSchedule &&
                thisWeekSchedule.map((schedule) =>
                    schedule.owner === userStore.userEmail
                        ? cardArray.push(
                            <Card
                                className={cx('my-card')}
                                key={schedule.name}
                                schedule={{
                                    owner: schedule.owner,
                                    scheduleDate: schedule.scheduleDate,
                                    startTime: schedule.startTime,
                                    endTime: schedule.endTime,
                                    name: schedule.name,
                                }}
                            />,
                        )
                        : cardArray.push(
                            <Card
                                className={cx('other-card')}
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
        return cardArray.sort(sortSchedule);
    };

    return (
        <div className={cx('wrapper')}>
            {thisWeekArray.map((thisWeek) => (
                <div key={`${thisWeek.year}.${thisWeek.month}.${thisWeek.date}`}>
                    <h2>✔ {`${thisWeek.year}.${thisWeek.month}.${thisWeek.date}`}</h2>
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
