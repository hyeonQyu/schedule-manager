import { autobind } from 'core-decorators';
import { action } from 'mobx';
import ScheduleModalStore from '@components/schedule-modal/store/ScheduleModalStore';
import UserStore from '@stores/UserStore';
import { ScheduleModalRequest } from '@requests/ScheduleModalRequest';
import { toast } from '@components/common/toast/Toast';

@autobind
export default class ScheduleAddModalStore extends ScheduleModalStore {
    private static _instance: ScheduleAddModalStore;
    private _userStore = UserStore.instance;

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
        this.setSelectedDate(calendarDate);

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

        toast.show('새로운 일정이 저장되었습니다.', 'success');
        await this.finishConfirm();
    }
}
