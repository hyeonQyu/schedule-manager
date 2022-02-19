import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './MonthlyStatistics.scss';
import PieChart from '@components/common/pie-chart/PieChart';

const cx = classNames.bind(style);

export interface MonthlyStatisticsProps {}

const MonthlyStatistics = observer(() => {
    return (
        <div className={cx('wrapper')}>
            <PieChart
                sectorList={[
                    { color: 'purple', percentage: 50 },
                    { color: 'yellow', percentage: 50 },
                ]}
                size={'80vw'}
                isDonut
            >
                gdgdg
            </PieChart>
        </div>
    );
});

export default MonthlyStatistics;
