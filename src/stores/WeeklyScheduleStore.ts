import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import { CalendarDate, DateInfo } from '@defines/defines';
import { DateUtil } from '@utils/DateUtil';
import { ScheduleCalendarRequest } from '@requests/ScheduleCalendarRequest';

@autobind
export default class WeeklyScheduleStore {
    private static _instance: WeeklyScheduleStore;

    @observable private _thisWeekDateList: CalendarDate[];
    @observable private _thisWeekSchedule: DateInfo[];

    private constructor() {
        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        this.setThisWeekList(DateUtil.getThisWeek({ year, month, date }));
        (async () => {
            this.setThisWeekSchedule(await ScheduleCalendarRequest.getDateInfosOfWeek(year, month, date));
        })();
        WeeklyScheduleStore._instance = this;
    }

    static get instance() {
        if (!WeeklyScheduleStore._instance) {
            WeeklyScheduleStore._instance = new WeeklyScheduleStore();
        }
        return this._instance;
    }

    get thisWeekDateList(): CalendarDate[] {
        return this._thisWeekDateList;
    }

    get thisWeekSchedule(): DateInfo[] {
        return this._thisWeekSchedule;
    }

    @action
    setThisWeekList(thisWeekDateList: CalendarDate[]) {
        this._thisWeekDateList = thisWeekDateList;
    }

    @action
    setThisWeekSchedule(thisWeekSchedule: DateInfo[]) {
        this._thisWeekSchedule = thisWeekSchedule;
    }
}
