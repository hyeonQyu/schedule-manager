import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import Datetime from '@utils/Datetime';
import ModalStore from '@stores/ModalStore';

@autobind
export default class ScheduleModalStore extends ModalStore {
    // 일정 이름
    @observable private _name: string = '';

    // 시작 일시
    @observable private _startDatetime: Datetime;

    // 종료 일시
    @observable private _endDatetime: Datetime;

    // 위치
    @observable private _location: string = '';

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

    @action
    setName(name: string) {
        this._name = name;
    }

    @action
    setStartDatetime(datetime: Datetime) {
        this._startDatetime = datetime;
    }

    @action
    setEndDatetime(datetime: Datetime) {
        this._endDatetime = datetime;
    }

    @action
    setStartYear(year: number) {
        this._startDatetime.year = year;
    }

    @action
    setStartMonth(month: number) {
        this._startDatetime.month = month;
    }

    @action
    setStartDate(date: number) {
        this._startDatetime.date = date;
    }

    @action
    setStartHours(hours: number) {
        this._startDatetime.hours = hours;
    }

    @action
    setStartMinutes(minutes: number) {
        this._startDatetime.minutes = minutes;
    }

    @action
    setEndYear(year: number) {
        this._endDatetime.year = year;
    }

    @action
    setEndMonth(month: number) {
        this._endDatetime.month = month;
    }

    @action
    setEndDate(date: number) {
        this._endDatetime.date = date;
    }

    @action
    setEndHours(hours: number) {
        this._endDatetime.hours = hours;
    }

    @action
    setEndMinutes(minutes: number) {
        this._endDatetime.minutes = minutes;
    }

    @action
    setLocation(location: string) {
        this._location = location;
    }
}
