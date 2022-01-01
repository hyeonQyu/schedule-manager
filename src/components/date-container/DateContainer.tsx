import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './DateContainer.scss';
import Card from '@components/card/Card';
import Datetime from '@utils/Datetime';
import { DateUtil } from '@utils/DateUtil';

const cx = classNames.bind(style);

const DateContainer = observer(() => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const thisWeekArr = DateUtil.getThisWeek({ year, month, date });

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
            {thisWeekArr.map((value) => {
                return (
                    <>
                        <h2>
                            ✔ {value.year}.{value.month}.{value.date}
                        </h2>
                        <div className={cx('schedule-container')}>
                            <div className={cx('schedule-line')} />
                            <div className={cx('schedule-info')}>{showSchedule()}</div>
                        </div>
                    </>
                );
            })}
        </div>
    );
});

export default DateContainer;
