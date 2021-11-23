import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import { CalendarDate, EDay, EMonthType, EWeek, EYear } from '@defines/defines';
import { DateUtil } from '@utils/DateUtil';
import { dialog } from '@components/common/dialog/Dialog';

@autobind
export default class ScheduleCalendarStore {
    private static _instance: ScheduleCalendarStore;

    @observable private _year: number = new Date().getFullYear();
    @observable private _month: number = new Date().getMonth() + 1;
    @observable private _dateList: CalendarDate[] = [];

    private constructor() {
        this.setDateList();
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

    get dateList(): CalendarDate[] {
        return this._dateList;
    }

    @action
    setYear(year) {
        this._year = year;
        this.setDateList();
    }

    @action
    setMonth(month) {
        this._month = month;
        this.setDateList();
    }

    @action
    setDateList() {
        const dateList: CalendarDate[] = [];

        // 이번달 첫번째 요일
        const firstDay = DateUtil.getFirstDay(this._year, this._month);

        // 지난달 마지막 일
        const lastDateOfLastMonth = DateUtil.getLastDate(this._year, this._month - 1);

        // 지난달 첫번째로 표시되는 일
        const firstDateOfLastMonth = lastDateOfLastMonth - firstDay + 1;

        // 이번달 마지막 일
        const lastDate = DateUtil.getLastDate(this._year, this._month);

        // 이번달 마지막 요일
        const lastDay = DateUtil.getLastDay(this._year, this._month);

        // 이번달 마지막 날의 주
        const lastWeek = Math.ceil((lastDate - lastDay) / EWeek.DATES_PER_WEEK) + (firstDay > 0 ? 1 : 0);

        // 다음달 마지막으로 표시되는 일
        const lastDateOfNextMonth = (EWeek.MAX_WEEK - lastWeek) * EWeek.DATES_PER_WEEK + (EDay.MAX_DAY - lastDay);

        // 지난달
        for (let i = firstDateOfLastMonth; i <= lastDateOfLastMonth; i++) {
            dateList.push({
                date: i,
                monthType: EMonthType.LAST_MONTH,
            });
        }
        // 이번달
        for (let i = 1; i <= lastDate; i++) {
            dateList.push({
                date: i,
                monthType: EMonthType.THIS_MONTH,
            });
        }
        // 다음달
        for (let i = 1; i <= lastDateOfNextMonth; i++) {
            dateList.push({
                date: i,
                monthType: EMonthType.NEXT_MONTH,
            });
        }

        this._dateList = dateList;
    }

    @action
    toPrevMonth() {
        let prevMonth = this._month - 1;
        if (prevMonth === 0) {
            const prevYear = this._year - 1;

            if (prevYear < EYear.MIN_YEAR) {
                dialog.alert(`${EYear.MIN_YEAR}년 이전은 조회할 수 없습니다.`);
                return;
            }

            this._year--;
            prevMonth = 12;
        }
        this.setMonth(prevMonth);
    }

    @action
    toNextMonth() {
        let nextMonth = this._month + 1;
        if (nextMonth > 12) {
            const nextYear = this._year + 1;

            if (nextYear > EYear.MAX_YEAR) {
                dialog.alert(`${EYear.MAX_YEAR}년 이후는 조회할 수 없습니다.`);
                return;
            }

            this._year++;
            nextMonth = 1;
        }
        this.setMonth(nextMonth);
    }
}
