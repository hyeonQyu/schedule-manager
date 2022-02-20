import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './WeeklyStatistics.scss';
import StatisticsStore from '@stores/StatisticsStore';
import { dayList } from '@defines/defines';
import { FormatUtil } from '@utils/FormatUtil';
import { NumberUtil } from '@utils/NumberUtil';
import PeriodSelector from '@components/common/period-selector/PeriodSelector';
import ChartBar from '@components/common/chart-bar/ChartBar';

const cx = classNames.bind(style);

const statisticsStore = StatisticsStore.instance;

const WeeklyStatistics = observer(() => {
    const {
        toPrevWeek,
        toNextWeek,
        isThisWeek,
        firstDateStringOfThisWeek,
        lastDateStringOfThisWeek,
        maxScheduleCount,
        weeklyStatisticsDateInfoList,
    } = statisticsStore;

    return (
        <div className={cx('wrapper')}>
            <PeriodSelector toPrev={toPrevWeek} toNext={toNextWeek} isNextDisabled={isThisWeek}>
                {isThisWeek ? '이번 주' : `${firstDateStringOfThisWeek} - ${lastDateStringOfThisWeek}`}
            </PeriodSelector>
            <div className={cx('chart')}>
                <div className={cx('chart__count')}>
                    <span>{maxScheduleCount}</span>
                    <span>0</span>
                </div>
                <div className={cx('chart__bar-group')}>
                    {weeklyStatisticsDateInfoList.map(({ calendarDate, scheduleCountInfo }) => {
                        const { me, other } = scheduleCountInfo;
                        return (
                            <div key={FormatUtil.calendarDateToString(calendarDate)} className={cx('bar')}>
                                <ChartBar width={'4vw'} percentage={NumberUtil.getPercentage(me, maxScheduleCount)} color="#a34dff"></ChartBar>
                                <ChartBar width={'4vw'} percentage={NumberUtil.getPercentage(other, maxScheduleCount)} color="#c482ff"></ChartBar>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={cx('dates')}>
                {weeklyStatisticsDateInfoList.map(({ calendarDate }) => {
                    const { year, month, date } = calendarDate;
                    return (
                        <span key={FormatUtil.calendarDateToString(calendarDate)}>
                            {FormatUtil.calendarDateToStringExceptYear(calendarDate)}({dayList[new Date(year, month, date).getDay()]})
                        </span>
                    );
                })}
            </div>
            <div className={cx('owner')}>
                <div>나의 일정</div>
                <div>너의 일정</div>
            </div>
        </div>
    );
});

export default WeeklyStatistics;
