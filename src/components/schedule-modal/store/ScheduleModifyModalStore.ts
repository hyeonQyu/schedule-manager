import { autobind } from 'core-decorators';
import ScheduleModalStore from '@components/schedule-modal/store/ScheduleModalStore';
import { action } from 'mobx';
import { Schedule } from '@defines/defines';
import UserStore from '@stores/UserStore';
import { toast } from '@components/common/toast/Toast';
import { ScheduleModalRequest } from '@requests/ScheduleModalRequest';
import { dialog } from '@components/common/dialog/Dialog';

@autobind
export default class ScheduleModifyModalStore extends ScheduleModalStore {
    private static _instance: ScheduleModifyModalStore;
    private _userStore = UserStore.instance;

    // 수정 전 일정 정보
    private _initialSchedule: Schedule;

    private constructor() {
        super();
        ScheduleModifyModalStore._instance = this;
    }

    static get instance() {
        if (!ScheduleModifyModalStore._instance) {
            ScheduleModifyModalStore._instance = new ScheduleModifyModalStore();
        }
        return this._instance;
    }

    open(schedule: Schedule, openCallback?: () => boolean) {
        super.open(schedule, () => {
            if (!this._userStore.isMe(schedule.owner)) {
                toast.show('상대방의 일정은 수정할 수 없어요.', 'error');
                return false;
            }
            return true;
        });
    }

    @action
    protected init(schedule: Schedule) {
        const { scheduleDate, name, startTime, endTime, location, isDate, unableToMeet } = schedule;

        this.setSelectedDate(scheduleDate);
        this.setName(name);
        this.setStartTime(startTime);
        this.setEndTime(endTime);
        this.setLocation(location);
        this.setIsDate(isDate);
        this.setUnableToMeet(unableToMeet);

        this.setInitialSchedule(schedule);
    }

    @action
    async confirm() {
        if (this.isStarScheduleOpened || !this.isValid()) {
            return;
        }

        if (this.isDate !== this._initialSchedule.isDate) {
            toast.show('데이트 여부는 수정할 수 없어요.\n데이트가 취소되었다면 일정을 삭제해주세요.', 'warning');
            return;
        }

        if (this.unableToMeet !== this._initialSchedule.unableToMeet) {
            dialog.confirm('못 만나는 날 여부를 수정하면 해당 날짜의 모든 일정이 못 만나는 날로 수정됩니다. 계속하시겠어요?', () => {
                (async () => {
                    await this.modify();
                })();
            });
            return;
        }

        await this.modify();
    }

    private async modify() {
        const { owner, createdDatetime } = this._initialSchedule;
        const { selectedDate, name, startTime, endTime, location, isDate, unableToMeet } = this;
        await ScheduleModalRequest.modifySchedule(
            {
                owner,
                scheduleDate: selectedDate,
                name,
                startTime,
                endTime,
                location,
                isDate,
                unableToMeet,
                createdDatetime,
            },
            this._initialSchedule,
        );

        toast.show('수정되었습니다.', 'success');
        await this.finishConfirm();
    }

    private setInitialSchedule(schedule: Schedule) {
        this._initialSchedule = schedule;
    }
}
