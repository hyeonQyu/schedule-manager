import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './WeeklyScheduleContainer.scss';
import Card from '@components/card/Card';
import WeeklyScheduleStore from '@stores/WeeklyScheduleStore';
import UserStore from '@stores/UserStore';
import { dayList } from '@defines/defines';
import { FormatUtil } from '@utils/FormatUtil';

const cx = classNames.bind(style);

const weekStore = WeeklyScheduleStore.instance;
const userStore = UserStore.instance;

const WeeklyScheduleContainer = observer(() => {
    const { thisWeekDateList, thisWeekSchedule } = weekStore;

    const getCardList = (year, month, date) => {
        const cardList = [];
        {
            thisWeekSchedule?.map(({ scheduleDate, createdDatetime, owner, startTime, endTime, name }) => {
                if (year === scheduleDate.year && month === scheduleDate.month && date === scheduleDate.date)
                    return cardList.push(
                        <Card
                            className={owner === userStore.userEmail ? cx('my-card') : cx('other-card')}
                            key={createdDatetime.toLocaleString()}
                            schedule={{
                                owner: owner,
                                scheduleDate: scheduleDate,
                                startTime: startTime,
                                endTime: endTime,
                                name: name,
                            }}
                        />,
                    );
            });
        }
        return cardList;
    };

    return (
        <div className={cx('wrapper')}>
            {thisWeekDateList.map(({ year, month, date }) => (
                <div key={`${year}.${month}.${date}`}>
                    {getCardList(year, month, date).length !== 0 && (
                        <>
                            <h2>
                                {`✔ ${FormatUtil.calendarDateToString({ year, month, date })} (${dayList[new Date(year, month - 1, date).getDay()]})`}
                            </h2>
                            <div className={cx('schedule-container')}>
                                <div className={cx('schedule-line')} />
                                <div className={cx('schedule-info')}>{getCardList(year, month, date)}</div>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
});

export default WeeklyScheduleContainer;
