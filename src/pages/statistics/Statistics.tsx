import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Statistics.scss';
import Layout from '@components/layout/Layout';
import WeeklyStatistics from '@components/weekly-statistics/WeeklyStatistics';
import MonthlyStatistics from '@components/monthly-statistics/MonthlyStatistics';

const cx = classNames.bind(style);

const Statistics = observer(() => {
    return (
        <Layout>
            <div className={cx('wrapper')}>
                <WeeklyStatistics />
                <MonthlyStatistics />
            </div>
        </Layout>
    );
});

export default Statistics;
