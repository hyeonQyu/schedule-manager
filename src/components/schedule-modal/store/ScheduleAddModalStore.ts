import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import Datetime from '@utils/Datetime';
import ScheduleModalStore from '@components/schedule-modal/store/ScheduleModalStore';

@autobind
export default class ScheduleAddModalStore extends ScheduleModalStore {
    private static _instance: ScheduleAddModalStore;

    @observable private _selectedDatetime: Datetime;

    private constructor() {
        super();
        ScheduleAddModalStore._instance = this;
        this.init();
    }

    static get instance() {
        if (!ScheduleAddModalStore._instance) {
            ScheduleAddModalStore._instance = new ScheduleAddModalStore();
        }
        return this._instance;
    }

    @action
    setSelectedDatetime(selectedDatetime: Datetime) {
        this._selectedDatetime = selectedDatetime;
    }

    @action
    protected init() {
        const today = new Date();

        this.setStartDatetime(this.getInitStartDatetime(today));
        this.setEndDatetime(this.getInitEndDatetime(today));
    }
}
