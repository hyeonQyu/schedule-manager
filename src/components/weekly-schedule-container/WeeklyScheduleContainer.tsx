import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './WeeklyScheduleContainer.scss';
import Card from '@components/card/Card';
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
            {thisWeekDateInfoList.map(
                ({ calendarDate: { year, month, date }, scheduleList }) =>
                    scheduleList && (
                        <div key={FormatUtil.calendarDateToString({ year, month, date })}>
                            <h2>{`✔ ${FormatUtil.calendarDateToString({ year, month, date })} (${DateUtil.getDay(year, month - 1, date)})`}</h2>
                            <div className={cx('schedule-container')}>
                                <div className={cx('schedule-line')} />
                                <div className={cx('schedule-info')}>
                                    {scheduleList.map(({ owner, createdDatetime, scheduleDate, startTime, endTime, name }) => {
                                        return (
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
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ),
            )}
        </div>
    );
});

export default WeeklyScheduleContainer;
