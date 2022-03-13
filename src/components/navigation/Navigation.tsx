import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Navigation.scss';
import NavigationTab from '@components/navigation/components/NavigationTab';
import { ENavigationType } from '@defines/defines';
import ScheduleCalendarStore from '@components/schedule-calendar/store/ScheduleCalendarStore';
import WeeklyScheduleStore from '@stores/WeeklyScheduleStore';
import StatisticsStore from '@stores/StatisticsStore';

const cx = classNames.bind(style);

const scheduleCalendarStore = ScheduleCalendarStore.instance;
const weeklyScheduleStore = WeeklyScheduleStore.instance;
const statisticsStore = StatisticsStore.instance;

const Navigation = observer(() => {
    const onNavigateHome = () => scheduleCalendarStore.init();
    const onNavigateWeekly = () => weeklyScheduleStore.init();
    const onNavigateStatistics = () => statisticsStore.init();

    return (
        <div className={cx('wrapper')}>
            <NavigationTab href={'/'} type={ENavigationType.ENTIRE} onNavigate={onNavigateHome} />
            <NavigationTab href={'/weekly'} type={ENavigationType.WEEKLY} onNavigate={onNavigateWeekly} />
            <NavigationTab href={'/statistics'} type={ENavigationType.STATISTICS} onNavigate={onNavigateStatistics} />
        </div>
    );
});

export default Navigation;
