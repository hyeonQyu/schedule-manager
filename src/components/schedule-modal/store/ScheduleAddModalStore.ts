import { autobind } from 'core-decorators';
import { action } from 'mobx';
import ScheduleModalStore from '@components/schedule-modal/store/ScheduleModalStore';

@autobind
export default class ScheduleAddModalStore extends ScheduleModalStore {
    private static _instance: ScheduleAddModalStore;

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
    protected confirm() {
        // TODO: isDate 인 경우 나, 상대방 모두 같은 일정을 갖도록 함
        // TODO: unableToMeet 인 경우 해당하는 날짜에 대한 모든 일정 unableToMeet 업데이트
    }
}
