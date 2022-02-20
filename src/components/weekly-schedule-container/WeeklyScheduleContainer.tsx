import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './WeeklyScheduleContainer.scss';
import Card from '@components/common/card/Card';
import WeeklyScheduleStore from '@stores/WeeklyScheduleStore';
import UserStore from '@stores/UserStore';
import { FormatUtil } from '@utils/FormatUtil';
import { DateUtil } from '@utils/DateUtil';

const cx = classNames.bind(style);

const weekStore = WeeklyScheduleStore.instance;
const userStore = UserStore.instance;

const WeeklyScheduleContainer = observer(() => {
    const { thisWeekDateInfoList } = weekStore;

    return (
        <div className={cx('wrapper')}>
            {thisWeekDateInfoList.map(({ calendarDate, scheduleList }) => {
                const { year, month, date } = calendarDate;
                const dateString = FormatUtil.calendarDateToString(calendarDate);
                return (
                    scheduleList && (
                        <div key={dateString}>
                            <h2>{`✔ ${dateString} (${DateUtil.getDay(year, month - 1, date)})`}</h2>
                            <div className={cx('schedule-container')}>
                                <div className={cx('schedule-line')} />
                                <div className={cx('schedule-info')}>
                                    {scheduleList.map(({ owner, createdDatetime, scheduleDate, startTime, endTime, name, location }) => {
                                        return (
                                            <Card
                                                className={userStore.isMe(owner) ? cx('my-card') : cx('other-card')}
                                                key={`${owner} ${createdDatetime.toLocaleString()}`}
                                                schedule={{
                                                    owner,
                                                    scheduleDate,
                                                    startTime,
                                                    endTime,
                                                    name,
                                                    location,
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                );
            })}
        </div>
    );
});

export default WeeklyScheduleContainer;
