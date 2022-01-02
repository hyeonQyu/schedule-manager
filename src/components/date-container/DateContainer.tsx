import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './DateContainer.scss';
import Card from '@components/card/Card';
import Datetime from '@utils/Datetime';
import WeeklyScheduleStore from '@stores/WeeklyScheduleStore';

const cx = classNames.bind(style);

const store = WeeklyScheduleStore.instance;

const DateContainer = observer(() => {
    const { thisWeekArr } = store;
    const showSchedule = () => {
        const myCardArr = [],
            otherCardArr = [];
        for (let i = 0; i < 2; i++) {
            myCardArr.push(
                <Card
                    className={cx('my-card')}
                    key={`my-card-${i}`}
                    schedule={{
                        startDatetime: new Datetime(2021, 11, 12, 10, 0),
                        endDatetime: new Datetime(2021, 11, 12, 10, 50),
                        name: 'schedule',
                    }}
                />,
            );
            otherCardArr.push(
                <Card
                    className={cx('other-card')}
                    key={`other-card-${i}`}
                    schedule={{
                        startDatetime: new Datetime(2021, 11, 12, 10, 0),
                        endDatetime: new Datetime(2021, 11, 12, 10, 50),
                        name: 'schedule',
                    }}
                />,
            );
        }
        const resultArr = [...myCardArr, ...otherCardArr];
        return resultArr;
    };
    return (
        <div className={cx('wrapper')}>
            {thisWeekArr.map(({ year, month, date }) => {
                return (
                    <div key={`${year}.${month}.${date}`}>
                        <h2>
                            ✔ {year}.{month}.{date}
                        </h2>
                        <div className={cx('schedule-container')}>
                            <div className={cx('schedule-line')} />
                            <div className={cx('schedule-info')}>{showSchedule()}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
});

export default DateContainer;
