import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import { CalendarDate, DateInfo } from '@defines/defines';
import { ScheduleCalendarRequest } from '@requests/ScheduleCalendarRequest';
import { DateUtil } from '@utils/DateUtil';

@autobind
export default class WeeklyScheduleStore {
    private static _instance: WeeklyScheduleStore;

    @observable private _thisWeekDateInfoList: DateInfo[];

    private constructor() {
        this.init();
        WeeklyScheduleStore._instance = this;
    }

    static get instance() {
        if (!WeeklyScheduleStore._instance) {
            WeeklyScheduleStore._instance = new WeeklyScheduleStore();
        }
        return this._instance;
    }

    get dateOfThisWeek(): CalendarDate {
        return this._thisWeekDateInfoList[0].calendarDate;
    }

    get thisWeekDateList(): CalendarDate[] {
        return this._thisWeekDateInfoList.map((value) => value.calendarDate);
    }

    get thisWeekDateInfoList(): DateInfo[] {
        return this._thisWeekDateInfoList;
    }

    @action
    setThisWeekDateInfoList(thisWeekDateInfoList: DateInfo[]) {
        this._thisWeekDateInfoList = thisWeekDateInfoList;
    }

    @action
    init() {
        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        (async () => {
            this.setThisWeekDateInfoList(await ScheduleCalendarRequest.getDateInfosOfWeek({ year, month, date }));
        })();
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
        this.setThisWeekDateInfoList(await ScheduleCalendarRequest.getDateInfosOfWeek(calendarDate));
    }
}
