import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import { CalendarDate, EDay, EWeek, EYear } from '@defines/defines';
import { DateUtil } from '@utils/DateUtil';
import { dialog } from '@components/common/dialog/Dialog';

@autobind
export default class ScheduleCalendarStore {
    private static _instance: ScheduleCalendarStore;

    @observable private _curYear: number = new Date().getFullYear();
    @observable private _curMonth: number = new Date().getMonth() + 1;
    @observable private _dateList: CalendarDate[] = [];
    @observable private _selectedCalendarDate: CalendarDate;

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

    get curYear(): number {
        return this._curYear;
    }

    get curMonth(): number {
        return this._curMonth;
    }

    get dateList(): CalendarDate[] {
        return this._dateList;
    }

    get selectedCalendarDate(): CalendarDate {
        return this._selectedCalendarDate;
    }

    @action
    setCurYear(year) {
        this._curYear = year;
        this.setDateList();
    }

    @action
    setCurMonth(month) {
        this._curMonth = month;
        this.setDateList();
    }

    @action
    setDateList() {
        const dateList: CalendarDate[] = [];

        // 이번달 첫번째 요일
        const firstDay = DateUtil.getFirstDay(this.curYear, this.curMonth);

        // 지난달 마지막 일
        const lastDateOfLastMonth = DateUtil.getLastDate(this.curYear, this.curMonth - 1);

        // 지난달 첫번째로 표시되는 일
        const firstDateOfLastMonth = lastDateOfLastMonth - firstDay + 1;

        // 이번달 마지막 일
        const lastDate = DateUtil.getLastDate(this.curYear, this.curMonth);

        // 이번달 마지막 요일
        const lastDay = DateUtil.getLastDay(this.curYear, this.curMonth);

        // 이번달 마지막 날의 주
        const lastWeek = Math.ceil((lastDate - lastDay) / EWeek.DATES_PER_WEEK) + (firstDay > 0 ? 1 : 0);

        // 다음달 마지막으로 표시되는 일
        const lastDateOfNextMonth = (EWeek.MAX_WEEK - lastWeek) * EWeek.DATES_PER_WEEK + (EDay.MAX_DAY - lastDay);

        // 지난달
        const lastMonthDate = DateUtil.getCalendarDate(this.curYear, this.curMonth - 1, 1);
        for (let i = firstDateOfLastMonth; i <= lastDateOfLastMonth; i++) {
            dateList.push({
                date: i,
                month: lastMonthDate.month,
                year: lastMonthDate.year,
            });
        }
        // 이번달
        for (let i = 1; i <= lastDate; i++) {
            dateList.push({
                date: i,
                month: this.curMonth,
                year: this.curYear,
            });
        }
        // 다음달
        const nextMonthDate = DateUtil.getCalendarDate(this.curYear, this.curMonth + 1, 1);
        for (let i = 1; i <= lastDateOfNextMonth; i++) {
            dateList.push({
                date: i,
                month: nextMonthDate.month,
                year: nextMonthDate.year,
            });
        }

        this._dateList = dateList;
    }

    @action
    toPrevMonth() {
        let prevMonth = this._curMonth - 1;
        if (prevMonth === 0) {
            const prevYear = this._curYear - 1;

            if (prevYear < EYear.MIN_YEAR) {
                dialog.alert(`${EYear.MIN_YEAR}년 이전은 조회할 수 없습니다.`);
                return;
            }

            this._curYear--;
            prevMonth = 12;
        }
        this.setCurMonth(prevMonth);
    }

    @action
    toNextMonth() {
        let nextMonth = this._curMonth + 1;
        if (nextMonth > 12) {
            const nextYear = this._curYear + 1;

            if (nextYear > EYear.MAX_YEAR) {
                dialog.alert(`${EYear.MAX_YEAR}년 이후는 조회할 수 없습니다.`);
                return;
            }

            this._curYear++;
            nextMonth = 1;
        }
        this.setCurMonth(nextMonth);
    }

    @action
    selectCalendarDate(calendarDate: CalendarDate) {
        if (!this._selectedCalendarDate) {
            this._selectedCalendarDate = calendarDate;
            return;
        }

        this._selectedCalendarDate = null;
        setTimeout(() => {
            this._selectedCalendarDate = calendarDate;
        }, 300);
    }
}
