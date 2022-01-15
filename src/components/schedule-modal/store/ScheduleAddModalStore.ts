import { autobind } from 'core-decorators';
import { action } from 'mobx';
import ScheduleModalStore from '@components/schedule-modal/store/ScheduleModalStore';
import UserStore from '@stores/UserStore';
import { dialog } from '@components/common/dialog/Dialog';
import { ScheduleModalRequest } from '@requests/ScheduleModalRequest';
import ScheduleCalendarStore from '@components/schedule-calendar/store/ScheduleCalendarStore';

@autobind
export default class ScheduleAddModalStore extends ScheduleModalStore {
    private static _instance: ScheduleAddModalStore;
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
    }

    @action
    async confirm() {
        if (!this.isValid()) {
            return;
        }

        const { selectedDate, name, startTime, endTime, location, isDate, unableToMeet } = this;
        await ScheduleModalRequest.addSchedule({
            owner: UserStore.instance.user.email,
            scheduleDate: selectedDate,
            name,
            startTime,
            endTime,
            location,
            isDate,
            unableToMeet,
        });

        dialog.alert('저장했습니다.', () => {
            (async () => {
                await this._scheduleCalendarStore.setDateList();
                this._scheduleCalendarStore.selectCalendarDate(null);
                this.close();
            })();
        });
    }
}
