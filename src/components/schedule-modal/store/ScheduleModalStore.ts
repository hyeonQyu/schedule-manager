import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import ModalStore from '@stores/ModalStore';
import { dialog } from '@components/common/dialog/Dialog';
import { CalendarDate, StarSchedule, Time } from '@defines/defines';

@autobind
export default class ScheduleModalStore extends ModalStore {
    // 일정을 추가, 수정하려는 날짜
    @observable private _selectedDate: CalendarDate;

    // 일정 이름
    @observable private _name: string = '';

    // 시작 시간
    @observable private _startTime: Time = { hour: 0, minute: 0 };

    // 종료 시간
    @observable private _endTime: Time = { hour: 23, minute: 50 };

    // 위치
    @observable private _location: string = '';

    // 데이트 여부
    @observable private _isDate: boolean = false;

    // 못 만나는 날 여부
    @observable private _unableToMeet: boolean = false;

    // 자주 사용하는 일정 불러오기 창 열림 여부
    @observable private _isStarScheduleOpened: boolean = false;

    // 자주 사용하는 일정 목록
    @observable private _starScheduleList: StarSchedule[] = [];

    get selectedDate(): CalendarDate {
        return this._selectedDate;
    }

    get name(): string {
        return this._name;
    }

    get startTime(): Time {
        return this._startTime;
    }

    get endTime(): Time {
        return this._endTime;
    }

    get location(): string {
        return this._location;
    }

    get isDate(): boolean {
        return this._isDate;
    }

    get unableToMeet(): boolean {
        return this._unableToMeet;
    }

    get isStarScheduleOpened(): boolean {
        return this._isStarScheduleOpened;
    }

    get starScheduleList(): StarSchedule[] {
        return this._starScheduleList;
    }

    get startHourList(): number[] {
        return this.getStartHourList();
    }

    get endHourList(): number[] {
        return this.getEndHourList();
    }

    get startMinuteList(): number[] {
        return this.getStartMinuteList();
    }

    get endMinuteList(): number[] {
        return this.getEndMinuteList();
    }

    @action
    setName(name: string) {
        this._name = name;
    }

    @action
    setStartTime(time: Time) {
        const { hour, minute } = time;
        if (ScheduleModalStore.isOutOfRange(hour, 0, 23) || ScheduleModalStore.isOutOfRange(minute, 0, 59)) {
            return;
        }
        this._startTime = time;
        this.setEndTimeIfInvalid();
    }

    @action
    setEndTime(time: Time) {
        const { hour, minute } = time;
        if (ScheduleModalStore.isOutOfRange(hour, 0, 23) || ScheduleModalStore.isOutOfRange(minute, 0, 59)) {
            return;
        }
        this._endTime = time;
    }

    @action
    setLocation(location: string) {
        this._location = location;
    }

    @action
    setIsDate(isDate: boolean) {
        this._isDate = isDate;
    }

    @action
    setUnableToMeet(unableToMeet: boolean) {
        this._unableToMeet = unableToMeet;
    }

    @action
    toggleIsDate() {
        this.setIsDate(!this.isDate);
    }

    @action
    toggleUnableToMeet() {
        this.setUnableToMeet(!this.unableToMeet);
    }

    @action
    setIsStarScheduleOpened(isOpened: boolean) {
        this._isStarScheduleOpened = isOpened;
    }

    @action
    setStarScheduleList(list: StarSchedule[]) {
        this._starScheduleList = list;
    }

    @action
    protected init(selectedDate: CalendarDate) {
        this._selectedDate = selectedDate;
    }

    /**
     * 데이터 저장 시 유효성 체크
     * @protected
     */
    @action
    protected isValid(): boolean {
        if (!this.name) {
            dialog.alert('일정 정보를 입력하세요.');
            return false;
        }

        if (this.isDate && this.unableToMeet) {
            dialog.alert('데이트 일정이면서 못 만나는 날일 수 없습니다.');
            return false;
        }

        return true;
    }

    /**
     * 완료 (저장)
     * @protected
     */
    @action
    async confirm() {}

    private getStartHourList() {
        return ScheduleModalStore.getValueList(0, 23, 1);
    }

    private getEndHourList() {
        return ScheduleModalStore.getValueList(this.startTime.hour, 23, 1);
    }

    private getStartMinuteList() {
        return ScheduleModalStore.getValueList(0, 50, 10);
    }

    private getEndMinuteList() {
        const minMinute = this.startTime.hour === this.endTime.hour ? this.startTime.minute : 0;
        return ScheduleModalStore.getValueList(minMinute, 50, 10);
    }

    private static getValueList(min: number, max: number, interval: number): number[] {
        const arr = [];
        for (let i = min; i <= max; i += interval) {
            arr.push(i);
        }
        return arr;
    }

    private static isOutOfRange(value: number, min: number, max: number) {
        if (value < min || value > max) {
            dialog.alert('허용된 범위 밖입니다.');
            return true;
        }
        return false;
    }

    /**
     * 시작 시간 변경 시 종료 시간이 시작 시간보다 앞서 있으면 종료 시간 변경
     * @private
     */
    private setEndTimeIfInvalid() {
        const { hour, minute } = this.startTime;

        let endHour = this.endTime.hour;
        let endMinute = this.endTime.minute;

        if (this.isEndTimeEarlierThanStartTime()) {
            if (hour > endHour) {
                endHour = hour;
            }
            if (hour === endHour && minute > endMinute) {
                endMinute = minute;
            }
        }
        this.setEndTime({ hour: endHour, minute: endMinute });
    }

    /**
     * 종료 시간이 시작 시간보다 앞섰는지 검사
     */
    private isEndTimeEarlierThanStartTime() {
        return this.startTime.hour > this.endTime.hour || (this.startTime.hour === this.endTime.hour && this._startTime.minute > this.endTime.minute);
    }
}
