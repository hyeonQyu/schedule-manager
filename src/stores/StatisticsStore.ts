import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import { CalendarDate, MonthlyStatisticsInfo, WeeklyStatisticsDateInfo, WeeklyStatisticsInfo } from '@defines/defines';
import { StatisticsRequest } from '@requests/StatisticsRequest';
import { DateUtil } from '@utils/DateUtil';
import { NumberUtil } from '@utils/NumberUtil';

@autobind
export default class StatisticsStore {
    private static _instance: StatisticsStore;

    @observable private _weeklyStatisticsInfo: WeeklyStatisticsInfo;

    // 월간 통계에 필요한 상태
    @observable private _selectedMonthDate: CalendarDate;
    @observable private _monthlyStatisticsInfo: MonthlyStatisticsInfo;

    private constructor() {
        const today = new Date();
        const todayObject = {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            date: today.getDate(),
        };

        this.setSelectedMonth(todayObject);

        (async () => {
            this.setWeeklyStatisticsInfo(await StatisticsRequest.getWeeklyStatisticsInfo(todayObject));
            await this.loadMonthlyStatisticsInfo(todayObject);
        })();
        StatisticsStore._instance = this;
    }

    static get instance() {
        if (!StatisticsStore._instance) {
            StatisticsStore._instance = new StatisticsStore();
        }
        return this._instance;
    }

    get maxScheduleCount(): number {
        return this._weeklyStatisticsInfo.maxScheduleCount;
    }

    get weeklyStatisticsDateInfoList(): WeeklyStatisticsDateInfo[] {
        return this._weeklyStatisticsInfo.weeklyStatisticsDateInfoList;
    }

    get calendarDateWithDateList(): CalendarDate[] {
        return this._monthlyStatisticsInfo.calendarDateWithDateList;
    }

    @action
    setWeeklyStatisticsInfo(weeklyStatisticsInfo: WeeklyStatisticsInfo) {
        this._weeklyStatisticsInfo = weeklyStatisticsInfo;
    }

    @action
    setMonthlyStatisticsInfo(monthlyStatisticsInfo: MonthlyStatisticsInfo) {
        this._monthlyStatisticsInfo = monthlyStatisticsInfo;
    }

    @action
    setSelectedMonth(calendarDate: CalendarDate) {
        this._selectedMonthDate = calendarDate;
    }

    @action
    toNextMonth() {
        const { year, month } = this._selectedMonthDate;
        this.changeMonth(year, month + 1);
    }

    @action
    toPrevMonth() {
        const { year, month } = this._selectedMonthDate;
        this.changeMonth(year, month - 1);
    }

    @action
    changeMonth(year, nextMonth: number) {
        this.setSelectedMonth(DateUtil.dateToCalendarDate(new Date(year, nextMonth - 1, 1)));
        this.loadMonthlyStatisticsInfo(this._selectedMonthDate);
    }

    getPercentageOfDate(): number {
        const { year, month } = this._selectedMonthDate;
        const totalDates = DateUtil.getLastDate(year, month);
        const dateWithDateCount = this.calendarDateWithDateList.length;
        return NumberUtil.getPercentage(dateWithDateCount, totalDates);
    }

    @action
    private async loadMonthlyStatisticsInfo(calendarDate: CalendarDate) {
        this.setMonthlyStatisticsInfo(await StatisticsRequest.getMonthlyStatisticsInfo(calendarDate));
    }
}
