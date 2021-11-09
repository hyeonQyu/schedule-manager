import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import Datetime from '@utils/Datetime';
import ModalStore from '@stores/ModalStore';
import { dialog } from '@components/common/dialog/Dialog';

@autobind
export default class ScheduleModalStore extends ModalStore {
    protected readonly MIN_YEAR = 1950;
    protected readonly MAX_YEAR = 2050;

    // 일정 이름
    @observable private _name: string = '';

    // 시작 일시
    @observable private _startDatetime: Datetime = this.getInitStartDatetime(new Date());

    // 종료 일시
    @observable private _endDatetime: Datetime = this.getInitEndDatetime(new Date());

    // 위치
    @observable private _location: string = '';

    // 시작 월에 따른 일
    @observable private _startDateList: number[] = [];

    // 종료 월에 따른 일
    @observable private _endDateList: number[] = [];

    // 시작 연도 선택에 따른 월
    @observable private _startMonthList: number[] = [];

    // 종료 연도 선택에 따른 월
    @observable private _endMonthList: number[] = [];

    private _yearList: number[] = this.getYearList();

    private _hoursList: number[] = this.getHoursList();

    private _minutesList: number[] = this.getMinutesList();

    get name(): string {
        return this._name;
    }

    get startDatetime(): Datetime {
        return this._startDatetime;
    }

    get endDatetime(): Datetime {
        return this._endDatetime;
    }

    get location(): string {
        return this._location;
    }

    get startDateList(): number[] {
        return this._startDateList;
    }

    get endDateList(): number[] {
        return this._endDateList;
    }

    get startMonthList(): number[] {
        return this._startMonthList;
    }

    get endMonthList(): number[] {
        return this._endMonthList;
    }

    get yearList(): number[] {
        return this._yearList;
    }

    get hoursList(): number[] {
        return this._hoursList;
    }

    get minutesList(): number[] {
        return this._minutesList;
    }

    @action
    setName(name: string) {
        this._name = name;
    }

    @action
    setStartDatetime(datetime: Datetime) {
        const { year, month } = datetime;
        this._startDatetime = datetime;
        this._startMonthList = this.getMonthList();
        this._startDateList = this.getDateList(year, month);
    }

    @action
    setEndDatetime(datetime: Datetime) {
        const { year, month } = datetime;
        this._endDatetime = datetime;
        this._endMonthList = this.getMonthList();
        this._endDateList = this.getDateList(year, month);
    }

    @action
    setStartYear(year: number) {
        if (this.isOutOfRange(year, this.MIN_YEAR, this.MAX_YEAR)) {
            return;
        }
        this._startDatetime.year = year;

        if (this._startMonthList.length < 2) {
            this._startMonthList = this.getMonthList();
        }
    }

    @action
    setStartMonth(month: number) {
        if (this.isOutOfRange(month, 1, 12)) {
            return;
        }
        this._startDatetime.month = month;
        this._startDateList = this.getDateList(this._startDatetime.year, month);
    }

    @action
    setStartDate(date: number) {
        if (this.isOutOfRange(date, 1, this._startDateList[this._startDateList.length - 1])) {
            return;
        }
        this._startDatetime.date = date;
    }

    @action
    setStartHours(hours: number) {
        if (this.isOutOfRange(hours, 0, 23)) {
            return;
        }
        this._startDatetime.hours = hours;
    }

    @action
    setStartMinutes(minutes: number) {
        if (this.isOutOfRange(minutes, 0, 59)) {
            return;
        }
        this._startDatetime.minutes = minutes;
    }

    @action
    setEndYear(year: number) {
        if (this.isOutOfRange(year, this.MIN_YEAR, this.MAX_YEAR)) {
            return;
        }
        this._endDatetime.year = year;

        if (this._endMonthList.length < 2) {
            this._endMonthList = this.getMonthList();
        }
    }

    @action
    setEndMonth(month: number) {
        if (this.isOutOfRange(month, 1, 12)) {
            return;
        }
        this._endDatetime.month = month;
        this._endDateList = this.getDateList(this._endDatetime.year, month);
    }

    @action
    setEndDate(date: number) {
        if (this.isOutOfRange(date, 1, this._endDateList[this._endDateList.length - 1])) {
            return;
        }
        this._endDatetime.date = date;
    }

    @action
    setEndHours(hours: number) {
        if (this.isOutOfRange(hours, 0, 23)) {
            return;
        }
        this._endDatetime.hours = hours;
    }

    @action
    setEndMinutes(minutes: number) {
        if (this.isOutOfRange(minutes, 0, 59)) {
            return;
        }
        this._endDatetime.minutes = minutes;
    }

    @action
    setLocation(location: string) {
        this._location = location;
    }

    @action
    protected getInitStartDatetime(today: Date) {
        return new Datetime(today.getFullYear(), today.getMonth() + 1, today.getDate(), 0, 0);
    }

    @action
    protected getInitEndDatetime(today: Date) {
        return new Datetime(today.getFullYear(), today.getMonth() + 1, today.getDate(), 23, 59);
    }

    protected getYearList() {
        const arr = [];
        for (let i = this.MIN_YEAR; i <= this.MAX_YEAR; i++) {
            arr.push(i);
        }
        return arr;
    }

    protected getMonthList() {
        const arr = [];
        for (let i = 1; i < 13; i++) {
            arr.push(i);
        }
        return arr;
    }

    protected getDateList(year: number, month: number) {
        const lastDate = new Date(year, month, 0).getDate();
        const arr = [];
        for (let i = 1; i <= lastDate; i++) {
            arr.push(i);
        }
        return arr;
    }

    protected getHoursList() {
        const arr = [];
        for (let i = 0; i < 24; i++) {
            arr.push(i);
        }
        return arr;
    }

    protected getMinutesList() {
        const arr = [];
        for (let i = 0; i < 60; i++) {
            arr.push(i);
        }
        return arr;
    }

    protected isOutOfRange(value: number, min: number, max: number) {
        if (value < min || value > max) {
            dialog.alert('허용된 범위 밖입니다.');
            return true;
        }
        return false;
    }
}
