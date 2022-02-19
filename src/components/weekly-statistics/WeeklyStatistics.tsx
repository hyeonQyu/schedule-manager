import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './WeeklyStatistics.scss';
import StatisticsStore from '@stores/StatisticsStore';
import ArrowIcon from '@icons/arrow/ArrowIcon';
import { dayList, EArrowDirection } from '@defines/defines';
import { FormatUtil } from '@utils/FormatUtil';
import { NumberUtil } from '@utils/NumberUtil';

const cx = classNames.bind(style);

const statisticsStore = StatisticsStore.instance;

const WeeklyStatistics = observer(() => {
    const { weeklyStatisticsDateInfoList, maxScheduleCount } = statisticsStore;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('arrow-container')}>
                <button>
                    <ArrowIcon direction={EArrowDirection.LEFT} />
                </button>
                <span>이번 주</span>
                <button disabled={true}>
                    <ArrowIcon direction={EArrowDirection.RIGHT} />
                </button>
            </div>
            <div className={cx('chart')}>
                <div className={cx('chart__count')}>
                    <span>{maxScheduleCount}</span>
                    <span>0</span>
                </div>
                <div className={cx('chart__bar-group')}>
                    {weeklyStatisticsDateInfoList.map(({ scheduleCountInfo }) => {
                        const { me, other } = scheduleCountInfo;
                        return (
                            <div className={cx('bar')}>
                                <div style={{ height: `${NumberUtil.getPercentage(me, maxScheduleCount)}%` }}></div>
                                <div style={{ height: `${NumberUtil.getPercentage(other, maxScheduleCount)}%` }}></div>
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
                            {month}/{date} ({dayList[new Date(year, month, date).getDay()]})
                        </span>
                    );
                })}
            </div>
            <div className={cx('owner')}>
                <div>
                    <div></div>나의 일정
                </div>
                <div>
                    <div></div>너의 일정
                </div>
            </div>
        </div>
    );
});

export default WeeklyStatistics;
