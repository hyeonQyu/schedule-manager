import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import { CalendarDate, DateInfo, EDay, EWeek, EYear, Schedule } from '@defines/defines';
import { DateUtil } from '@utils/DateUtil';
import { ScheduleCalendarRequest } from '@requests/ScheduleCalendarRequest';
import { toast } from '@components/common/toast/Toast';
import { dialog } from '@components/common/dialog/Dialog';
import UserStore from '@stores/UserStore';

@autobind
export default class ScheduleCalendarStore {
    private static _instance: ScheduleCalendarStore;
    private _userStore = UserStore.instance;

    @observable private _todayCalendarDate: CalendarDate;

    @observable private _curYear: number = new Date().getFullYear();
    @observable private _curMonth: number = new Date().getMonth() + 1;
    @observable private _dateList: DateInfo[] = [];
    @observable private _selectedCalendarDate: CalendarDate;
    @observable private _selectedDateScheduleList: Schedule[] = [];

    private constructor() {
        this.init();
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
        (async () => await this.loadDateList())();
    }

    @action
    setCurMonth(month) {
        this._curMonth = month;
        (async () => await this.loadDateList())();
    }

    @action
    init() {
        const today = new Date();
        this._todayCalendarDate = {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            date: today.getDate(),
        };
        const { year, month } = this.todayCalendarDate;

        this._curYear = year;
        this._curMonth = month;
        (async () => {
            await this.selectCalendarDate(null);
            await this.loadDateList();
        })();
    }

    @action
    async loadDateList(): Promise<void> {
        const dateList: DateInfo[] = [];

        // ????????? ????????? ??????
        const firstDay = DateUtil.getFirstDay(this.curYear, this.curMonth);

        // ????????? ????????? ???
        const lastDateOfLastMonth = DateUtil.getLastDate(this.curYear, this.curMonth - 1);

        // ????????? ???????????? ???????????? ???
        const firstDateOfLastMonth = lastDateOfLastMonth - firstDay + 1;

        // ????????? ????????? ???
        const lastDate = DateUtil.getLastDate(this.curYear, this.curMonth);

        // ????????? ????????? ??????
        const lastDay = DateUtil.getLastDay(this.curYear, this.curMonth);

        // ????????? ????????? ?????? ???
        const lastWeek = Math.ceil((lastDate - lastDay) / EWeek.DATES_PER_WEEK) + (firstDay > 0 ? 1 : 0);

        // ????????? ??????????????? ???????????? ???
        const lastDateOfNextMonth = (EWeek.MAX_WEEK - lastWeek) * EWeek.DATES_PER_WEEK + (EDay.MAX_DAY - lastDay);

        // ?????? ??? ?????? ??????
        const scheduleList = await ScheduleCalendarRequest.getSchedulesOfMonth({ year: this.curYear, month: this.curMonth, date: lastDate });

        action(() => {
            // ?????????
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

            // ?????????
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

            // ?????????
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
                toast.show(`${EYear.MIN_YEAR}??? ????????? ????????? ??? ????????????.`, 'error');
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
                toast.show(`${EYear.MAX_YEAR}??? ????????? ????????? ??? ????????????.`, 'error');
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
            const scheduleList = await ScheduleCalendarRequest.getSchedulesOfDate(calendarDate);

            action(() => {
                this._selectedDateScheduleList = scheduleList;
                this._selectedCalendarDate = calendarDate;
            })();
        })();
    }

    @action
    deleteSchedule(schedule: Schedule) {
        if (!this._userStore.isMe(schedule.owner)) {
            toast.show('???????????? ????????? ????????? ??? ?????????.', 'error');
            return;
        }

        dialog.confirm('????????? ??????????????????????', () => {
            (async () => {
                await ScheduleCalendarRequest.deleteSchedule(schedule);
                toast.show('????????? ?????????????????????.', 'success');

                this.selectCalendarDate(null);
                await this.loadDateList();
            })();
        });
    }
}
