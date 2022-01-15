import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import { CalendarDate, DateInfo, EDay, EWeek, EYear, Schedule } from '@defines/defines';
import { DateUtil } from '@utils/DateUtil';
import { dialog } from '@components/common/dialog/Dialog';
import { ScheduleCalendarRequest } from '@requests/ScheduleCalendarRequest';

@autobind
export default class ScheduleCalendarStore {
    private static _instance: ScheduleCalendarStore;

    @observable private readonly _todayCalendarDate: CalendarDate;

    @observable private _curYear: number = new Date().getFullYear();
    @observable private _curMonth: number = new Date().getMonth() + 1;
    @observable private _dateList: DateInfo[] = [];
    @observable private _selectedCalendarDate: CalendarDate;
    @observable private _selectedDateScheduleList: Schedule[] = [];

    private constructor() {
        const today = new Date();
        this._todayCalendarDate = {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            date: today.getDate(),
        };

        (async () => await this.setDateList())();

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

    get dateList(): DateInfo[] {
        return this._dateList;
    }

    get selectedCalendarDate(): CalendarDate {
        return this._selectedCalendarDate;
    }

    get selectedDateScheduleList(): Schedule[] {
        return this._selectedDateScheduleList;
    }

    get todayCalendarDate(): CalendarDate {
        return this._todayCalendarDate;
    }

    @action
    setCurYear(year) {
        this._curYear = year;
        (async () => await this.setDateList())();
    }

    @action
    setCurMonth(month) {
        this._curMonth = month;
        (async () => await this.setDateList())();
    }

    @action
    async setDateList(): Promise<void> {
        const dateList: DateInfo[] = [];

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

        // 이번 달 일정 조회
        const scheduleList = await ScheduleCalendarRequest.getSchedulesOfMonth(this.curYear, this.curMonth, lastDate);

        action(() => {
            // 지난달
            const lastMonthDate = DateUtil.getCalendarDate(this.curYear, this.curMonth - 1, 1);
            for (let i = firstDateOfLastMonth; i <= lastDateOfLastMonth; i++) {
                dateList.push({
                    calendarDate: {
                        date: i,
                        month: lastMonthDate.month,
                        year: lastMonthDate.year,
                    },
                });
            }

            // 이번달
            let scheduleListIndex = 0;
            for (let i = 1; i <= lastDate; i++) {
                dateList.push({
                    calendarDate: {
                        date: i,
                        month: this.curMonth,
                        year: this.curYear,
                    },
                    scheduleList: (() => {
                        if (scheduleList.length === scheduleListIndex || scheduleList[scheduleListIndex].scheduleDate.date > i) {
                            return null;
                        }

                        const list = [];
                        while (scheduleList[scheduleListIndex].scheduleDate.date === i) {
                            list.push(scheduleList[scheduleListIndex]);
                            if (++scheduleListIndex === scheduleList.length) {
                                break;
                            }
                        }
                        return list;
                    })(),
                });
            }

            // 다음달
            const nextMonthDate = DateUtil.getCalendarDate(this.curYear, this.curMonth + 1, 1);
            for (let i = 1; i <= lastDateOfNextMonth; i++) {
                dateList.push({
                    calendarDate: {
                        date: i,
                        month: nextMonthDate.month,
                        year: nextMonthDate.year,
                    },
                });
            }

            this._dateList = dateList;
        })();
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
        this.selectCalendarDate(null);
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
        this.selectCalendarDate(null);
    }

    @action
    selectCalendarDate(calendarDate: CalendarDate) {
        if (!calendarDate) {
            this._selectedCalendarDate = calendarDate;
            return;
        }

        (async () => {
            const { year, month, date } = calendarDate;
            const scheduleList = await ScheduleCalendarRequest.getSchedulesOfDate(year, month, date);

            action(() => {
                this._selectedDateScheduleList = scheduleList;
                this._selectedCalendarDate = calendarDate;
            })();
        })();
    }
}
