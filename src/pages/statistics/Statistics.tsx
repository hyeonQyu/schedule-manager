import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Statistics.scss';
import Layout from '@components/layout/Layout';

const cx = classNames.bind(style);

const Statistics = observer(() => {
    return (
        <Layout>
            <div className={cx('wrapper')}>통계 페이지</div>
        </Layout>
    );
});

export default Statistics;
