import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import { CalendarDate, MonthlyStatisticsInfo, WeeklyStatisticsDateInfo, WeeklyStatisticsInfo } from '@defines/defines';
import { StatisticsRequest } from '@requests/StatisticsRequest';
import { DateUtil } from '@utils/DateUtil';
import { NumberUtil } from '@utils/NumberUtil';
import { FormatUtil } from '@utils/FormatUtil';

@autobind
export default class StatisticsStore {
    private static _instance: StatisticsStore;

    @observable private _weeklyStatisticsInfo: WeeklyStatisticsInfo;

    // 월간 통계에 필요한 상태
    @observable private _selectedMonthDate: CalendarDate;
    @observable private _monthlyStatisticsInfo: MonthlyStatisticsInfo;

    private constructor() {
        const today = new Date();
        const todayDate = {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            date: today.getDate(),
        };

        this.setSelectedMonth(todayDate);

        (async () => {
            this.setWeeklyStatisticsInfo(await StatisticsRequest.getWeeklyStatisticsInfo(todayDate));
            await this.loadMonthlyStatisticsInfo(todayDate);
        })();
        StatisticsStore._instance = this;
    }

    static get instance() {
        if (!StatisticsStore._instance) {
            StatisticsStore._instance = new StatisticsStore();
        }
        return this._instance;
    }

    get dateOfThisWeek(): CalendarDate {
        return this._weeklyStatisticsInfo.weeklyStatisticsDateInfoList[0].calendarDate;
    }

    get isThisWeek(): boolean {
        const today = new Date();
        const isThisWeek = ({ calendarDate }) => {
            const { year, month, date } = calendarDate;
            return year === today.getFullYear() && month === today.getMonth() + 1 && date === today.getDate();
        };
        return this.weeklyStatisticsDateInfoList.some(isThisWeek);
    }

    get firstDateStringOfThisWeek(): string {
        return FormatUtil.calendarDateToStringExceptYear(this._weeklyStatisticsInfo.weeklyStatisticsDateInfoList[0].calendarDate);
    }

    get lastDateStringOfThisWeek(): string {
        return FormatUtil.calendarDateToStringExceptYear(this._weeklyStatisticsInfo.weeklyStatisticsDateInfoList[6].calendarDate);
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

    get selectedMonthDate(): CalendarDate {
        return this._selectedMonthDate;
    }

    get isThisMonth(): boolean {
        const today = new Date();
        const { year, month } = this.selectedMonthDate;
        return year === today.getFullYear() && month === today.getMonth() + 1;
    }

    @action
    setWeeklyStatisticsInfo(weeklyStatisticsInfo: WeeklyStatisticsInfo) {
        this._weeklyStatisticsInfo = weeklyStatisticsInfo;
    }

    @action
    toPrevWeek() {
        this.changeWeek(DateUtil.getLastWeekDate(this.dateOfThisWeek));
    }

    @action
    toNextWeek() {
        this.changeWeek(DateUtil.getNextWeekDate(this.dateOfThisWeek));
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

    @action
    private async changeWeek(calendarDate: CalendarDate) {
        this.setWeeklyStatisticsInfo(await StatisticsRequest.getWeeklyStatisticsInfo(calendarDate));
    }

    @action
    private async changeMonth(year, nextMonth: number) {
        this.setSelectedMonth(DateUtil.dateToCalendarDate(new Date(year, nextMonth - 1, 1)));
        await this.loadMonthlyStatisticsInfo(this._selectedMonthDate);
    }
}
