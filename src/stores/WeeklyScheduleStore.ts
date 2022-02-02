import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import { CalendarDate, Schedule } from '@defines/defines';
import { DateUtil } from '@utils/DateUtil';
import { ScheduleCalendarRequest } from '@requests/ScheduleCalendarRequest';

@autobind
export default class WeeklyScheduleStore {
    private static _instance: WeeklyScheduleStore;

    @observable private _thisWeekArray: CalendarDate[];
    @observable private _thisWeekSchedule: Schedule[];

    private constructor() {
        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        this.setThisWeekArray(DateUtil.getThisWeek({ year, month, date }));
        (async() => {
            this.setThisWeekSchedule(await ScheduleCalendarRequest.getSchedulesOfWeek(year, month, date));
        })();
        WeeklyScheduleStore._instance = this;
    }

    static get instance() {
        if (!WeeklyScheduleStore._instance) {
            WeeklyScheduleStore._instance = new WeeklyScheduleStore();
        }
        return this._instance;
    }

    get thisWeekArray(): CalendarDate[] {
        return this._thisWeekArray;
    }

    get thisWeekSchedule(): Schedule[] {
        return this._thisWeekSchedule;
    }

    @action
    setThisWeekArray(thisWeekArray: CalendarDate[]) {
        this._thisWeekArray = thisWeekArray;
    }

    @action
    setThisWeekSchedule(thisWeekSchedule: Schedule[]) {
        this._thisWeekSchedule = thisWeekSchedule;
    }
}
