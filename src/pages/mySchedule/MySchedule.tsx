import React from 'react';
import { observer } from 'mobx-react';
import Layout from '@components/layout/Layout';
import DateSlider from '@components/common/date-slider/DateSlider';
import Card from '@components/card/Card';
import Datetime from '@utils/Datetime';
import classNames from 'classnames/bind';
import style from './MySchedule.scss';

const cx = classNames.bind(style);

const MySchedule = observer(() => {
    const showSchedule = () => {
        const myCardArr = [],
            otherCardArr = [];
        for (let i = 0; i < 3; i++) {
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
        <Layout>
            <div className={cx('wrapper')}>
                <h1>Weekly Schedule</h1>
                <DateSlider />
                {showSchedule()}
            </div>
        </Layout>
    );
});

export default MySchedule;
