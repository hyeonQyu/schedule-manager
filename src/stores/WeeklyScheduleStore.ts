import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import { CalendarDate, DateInfo } from '@defines/defines';
import { ScheduleCalendarRequest } from '@requests/ScheduleCalendarRequest';

@autobind
export default class WeeklyScheduleStore {
    private static _instance: WeeklyScheduleStore;

    @observable private _thisWeekDateInfoList: DateInfo[];

    private constructor() {
        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        (async () => {
            this.setThisWeekDateInfoList(await ScheduleCalendarRequest.getDateInfosOfWeek(year, month, date));
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
        return this._thisWeekDateInfoList.map((value) => value.calendarDate);
    }

    get thisWeekDateInfoList(): DateInfo[] {
        return this._thisWeekDateInfoList;
    }

    @action
    setThisWeekDateInfoList(thisWeekDateInfoList: DateInfo[]) {
        this._thisWeekDateInfoList = thisWeekDateInfoList;
    }
}
