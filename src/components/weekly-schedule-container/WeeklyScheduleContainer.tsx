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
    const { thisWeekSchedule } = weekStore;

    const getCardList = (scheduleList) => {
        const cardList = [];
        {
            scheduleList?.map(({ owner, createdDatetime, scheduleDate, startTime, endTime, name }) => {
                return cardList.push(
                    <Card
                        className={owner === userStore.userEmail ? cx('my-card') : cx('other-card')}
                        key={createdDatetime.toLocaleString()}
                        schedule={{
                            owner,
                            scheduleDate,
                            startTime,
                            endTime,
                            name,
                        }}
                    />,
                );
            });
        }
        return cardList;
    };

    return (
        <div className={cx('wrapper')}>
            {thisWeekSchedule.map(
                ({ calendarDate, scheduleList }, index) =>
                    scheduleList && (
                        <div key={index}>
                            <h2>
                                {`✔ ${FormatUtil.calendarDateToString(calendarDate)} (${
                                    dayList[new Date(calendarDate.year, calendarDate.month - 1, calendarDate.date).getDay()]
                                })`}
                            </h2>
                            <div className={cx('schedule-container')}>
                                <div className={cx('schedule-line')} />
                                <div className={cx('schedule-info')}>{getCardList(scheduleList)}</div>
                            </div>
                        </div>
                    ),
            )}
        </div>
    );
});

export default WeeklyScheduleContainer;
