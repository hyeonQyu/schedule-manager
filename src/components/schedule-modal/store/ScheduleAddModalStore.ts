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
}
