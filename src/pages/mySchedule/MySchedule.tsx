import React from 'react';
import { observer } from 'mobx-react';
import Layout from '@components/layout/Layout';
import DateSlider from '@components/common/date-slider/DateSlider';
import classNames from 'classnames/bind';
import style from './MySchedule.scss';
import DateContainer from '@components/date-container/DateContainer';

const cx = classNames.bind(style);

const MySchedule = observer(() => {
    return (
        <Layout>
            <div className={cx('wrapper')}>
                <h1>Weekly Schedule</h1>
                <DateSlider />
                <DateContainer />
                <DateContainer />
            </div>
        </Layout>
    );
});

export default MySchedule;
