import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import { CalendarDate } from '@defines/defines';
import { DateUtil } from '@utils/DateUtil';

@autobind
export default class WeeklyScheduleStore {
    private static _instance: WeeklyScheduleStore;

    @observable private _thisWeekArr: CalendarDate[];

    private constructor() {
        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        this.setThisWeekArr(DateUtil.getThisWeek({ year, month, date }));
        WeeklyScheduleStore._instance = this;
    }

    static get instance() {
        if (!WeeklyScheduleStore._instance) {
            WeeklyScheduleStore._instance = new WeeklyScheduleStore();
        }
        return this._instance;
    }

    get thisWeekArr(): CalendarDate[] {
        return this._thisWeekArr;
    }

    @action
    setThisWeekArr(thisWeekArr: CalendarDate[]) {
        this._thisWeekArr = thisWeekArr;
    }
}
