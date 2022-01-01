import React from 'react';
import { observer } from 'mobx-react';
import Layout from '@components/layout/Layout';
import DateSlider from '@components/common/date-slider/DateSlider';
import classNames from 'classnames/bind';
import style from './weeklySchedule.scss';
import DateContainer from '@components/date-container/DateContainer';
import { DateUtil } from '@utils/DateUtil';

const cx = classNames.bind(style);

const WeeklySchedule = observer(() => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const thisWeekArr = DateUtil.getThisWeek({ year, month, date });

    return (
        <Layout>
            <div className={cx('wrapper')}>
                <h1>Weekly Schedule</h1>
                <DateSlider thisWeekArr={thisWeekArr} />
                <DateContainer thisWeekArr={thisWeekArr} />
            </div>
        </Layout>
    );
});

export default WeeklySchedule;
