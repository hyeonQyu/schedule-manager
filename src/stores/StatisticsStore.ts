import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import { WeeklyStatisticsDateInfo, WeeklyStatisticsInfo } from '@defines/defines';
import { StatisticsRequest } from '@requests/StatisticsRequest';

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
}