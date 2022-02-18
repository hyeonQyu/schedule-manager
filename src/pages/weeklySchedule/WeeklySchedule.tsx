import React from 'react';
import { observer } from 'mobx-react';
import Layout from '@components/layout/Layout';
import DateSlider from '@components/common/date-slider/DateSlider';
import classNames from 'classnames/bind';
import style from './WeeklySchedule.scss';
import WeeklyScheduleContainer from '@components/weekly-schedule-container/WeeklyScheduleContainer';

const cx = classNames.bind(style);

const WeeklySchedule = observer(() => {
    return (
        <Layout>
            <div className={cx('wrapper')}>
                <div className={cx('weekly-header')}>
                    <h1>Weekly Schedule</h1>
                    <DateSlider />
                </div>
                <WeeklyScheduleContainer />
            </div>
        </Layout>
    );
});

export default WeeklySchedule;
