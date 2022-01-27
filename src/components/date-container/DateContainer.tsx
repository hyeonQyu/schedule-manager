import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './DateContainer.scss';
import Card from '@components/card/Card';

const cx = classNames.bind(style);

const DateContainer = observer(() => {
    const showSchedule = () => {
        const myCardArr = [],
            otherCardArr = [];
        for (let i = 0; i < 2; i++) {
            myCardArr.push(
                <Card
                    className={cx('my-card')}
                    key={`my-card-${i}`}
                    schedule={{
                        scheduleDate: { year: 2021, month: 11, date: 24 },
                        startTime: { hour: 10, minute: 0 },
                        endTime: { hour: 13, minute: 20 },
                        name: 'schedule',
                    }}
                />,
            );
            otherCardArr.push(
                <Card
                    className={cx('other-card')}
                    key={`other-card-${i}`}
                    schedule={{
                        scheduleDate: { year: 2021, month: 11, date: 24 },
                        startTime: { hour: 10, minute: 0 },
                        endTime: { hour: 13, minute: 20 },
                        name: 'schedule',
                    }}
                />,
            );
        }
        return [...myCardArr, ...otherCardArr];
    };
    return (
        <div className={cx('wrapper')}>
            <h2>✔ 2021.11.12</h2>
            <div className={cx('schedule-container')}>
                <div className={cx('schedule-line')} />
                <div className={cx('schedule-info')}>{showSchedule()}</div>
            </div>
        </div>
    );
});

export default DateContainer;
