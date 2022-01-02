import React from 'react';
import { observer } from 'mobx-react';
import Layout from '@components/layout/Layout';
import DateSlider from '@components/common/date-slider/DateSlider';
import classNames from 'classnames/bind';
import style from './weeklySchedule.scss';
import DateContainer from '@components/date-container/DateContainer';
import WeeklyScheduleStore from '@stores/WeeklyScheduleStore';

const cx = classNames.bind(style);

const store = WeeklyScheduleStore.instance;

const WeeklySchedule = observer(() => {
    const { thisWeekArr } = store;
    return (
        <Layout>
            <div className={cx('wrapper')}>
                <h1>Weekly Schedule</h1>
                <DateSlider />
                <DateContainer />
            </div>
        </Layout>
    );
});

export default WeeklySchedule;
