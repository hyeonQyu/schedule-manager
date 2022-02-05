import { autobind } from 'core-decorators';
import { action } from 'mobx';
import ScheduleModalStore from '@components/schedule-modal/store/ScheduleModalStore';
import UserStore from '@stores/UserStore';
import { dialog } from '@components/common/dialog/Dialog';
import { ScheduleModalRequest } from '@requests/ScheduleModalRequest';
import ScheduleCalendarStore from '@components/schedule-calendar/store/ScheduleCalendarStore';
import { StarSchedule } from '@defines/defines';

@autobind
export default class ScheduleAddModalStore extends ScheduleModalStore {
    private static _instance: ScheduleAddModalStore;
    private _userStore = UserStore.instance;
    private _scheduleCalendarStore = ScheduleCalendarStore.instance;

    private constructor() {
        super();
        ScheduleAddModalStore._instance = this;
    }

    static get instance() {
        if (!ScheduleAddModalStore._instance) {
            ScheduleAddModalStore._instance = new ScheduleAddModalStore();
        }
        return this._instance;
    }

    /**
     * 모달이 새로 열릴때마다 초기화 실행
     * @param calendarDate
     * @protected
     */
    @action
    protected init(calendarDate) {
        super.init(calendarDate);

        (async () => this.setUnableToMeet(await ScheduleModalRequest.getUnableToMeetOfDate(calendarDate)))();

        this.setName('');
        this.setLocation('');

        this.setIsDate(false);
        this.setEndTime({
            hour: 23,
            minute: 50,
        });
        this.setStartTime({
            hour: 0,
            minute: 0,
        });

        this.setIsStarScheduleOpened(false);
        this.setStarScheduleList([]);
    }

    @action
    close() {
        dialog.alert('닫기 누름', () => {
            if (this.isStarScheduleOpened) {
                this.setIsStarScheduleOpened(false);
                return;
            }
            dialog.alert('super.close() 실행 전', () => {
                super.close();
                dialog.alert(`super.close() 실행 이후 isOpened: ${this.isOpened}`);
            });
            // super.close();
        });
    }

    @action
    async confirm() {
        if (this.isStarScheduleOpened || !this.isValid()) {
            return;
        }

        const { selectedDate, name, startTime, endTime, location, isDate, unableToMeet } = this;
        await ScheduleModalRequest.addSchedule({
            owner: this._userStore.userEmail,
            scheduleDate: selectedDate,
            name,
            startTime,
            endTime,
            location,
            isDate,
            unableToMeet,
        });

        dialog.alert('새로운 일정이 저장되었습니다.', () => {
            (async () => {
                await this._scheduleCalendarStore.loadDateList();
                this._scheduleCalendarStore.selectCalendarDate(null);
                this.close();
            })();
        });
    }

    /**
     * 자주 사용하는 일정 저장 버튼 클릭
     */
    saveStarSchedule() {
        if (!this.name) {
            dialog.alert('자주 쓰는 일정으로 등록하기 위해 일정 이름을 입력해야 합니다.');
            return;
        }

        dialog.confirm('현재 작성한 일정과 같은 내용으로 자주 사용하는 일정으로 등록하시겠습니까?', () => {
            (async () => {
                const { name, startTime, endTime, location } = this;
                await ScheduleModalRequest.registerStarSchedule({
                    name,
                    startTime,
                    endTime,
                    location,
                });
                dialog.alert('자주 사용하는 일정이 등록되었습니다.');
            })();
        });
    }

    /**
     * 자주 사용하는 일정 불러오기 버튼 클릭
     */
    openLoadStarSchedule() {
        (async () => {
            this.setStarScheduleList(await ScheduleModalRequest.getStarSchedules());
            this.setIsStarScheduleOpened(true);
        })();
    }

    /**
     * 자주 사용하는 일정 선택하여 불러오기
     */
    selectStarSchedule(starSchedule: StarSchedule) {
        const { name, startTime, endTime, location } = starSchedule;
        this.setName(name);
        this.setStartTime(startTime);
        this.setEndTime(endTime);
        this.setLocation(location);
        this.setIsStarScheduleOpened(false);
    }
}
