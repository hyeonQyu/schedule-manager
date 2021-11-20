import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';

@autobind
export default class ScheduleCalendarStore {
    private static _instance: ScheduleCalendarStore;

    @observable private _year: number = new Date().getFullYear();
    @observable private _month: number = new Date().getMonth() + 1;

    private constructor() {
        ScheduleCalendarStore._instance = this;
    }

    static get instance() {
        if (!ScheduleCalendarStore._instance) {
            ScheduleCalendarStore._instance = new ScheduleCalendarStore();
        }
        return this._instance;
    }

    get year(): number {
        return this._year;
    }

    get month(): number {
        return this._month;
    }

    @action
    setYear(year) {
        this._year = year;
    }

    @action
    setMonth(month) {
        this._month = month;
    }
}
