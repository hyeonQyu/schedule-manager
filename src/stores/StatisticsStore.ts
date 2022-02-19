import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import { CalendarDate, WeeklyStatisticsDateInfo, WeeklyStatisticsInfo } from '@defines/defines';
import { StatisticsRequest } from '@requests/StatisticsRequest';
import { DateUtil } from '@utils/DateUtil';
import { FormatUtil } from '@utils/FormatUtil';

@autobind
export default class StatisticsStore {
    private static _instance: StatisticsStore;

    @observable private _weeklyStatisticsInfo: WeeklyStatisticsInfo;

    private constructor() {
        const today = new Date();
        const todayObject = {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            date: today.getDate(),
        };
        (async () => {
            this.setWeeklyStatisticsInfo(await StatisticsRequest.getWeeklyStatisticsInfo(todayObject));
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
        const isThisWeek = ({ calendarDate }) => calendarDate.date === new Date().getDate();
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
    private async changeWeek(calendarDate: CalendarDate) {
        this.setWeeklyStatisticsInfo(await StatisticsRequest.getWeeklyStatisticsInfo(calendarDate));
    }
}
