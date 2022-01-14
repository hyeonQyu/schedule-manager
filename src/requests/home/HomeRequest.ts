import { Collections } from '@collections/Collections';
import UserStore from '@stores/UserStore';
import { ScheduleVO } from '@models/ScheduleVO';
import env from '../../env';

export namespace HomeRequest {
    const userStore = UserStore.instance;

    /**
     * 일정 추가
     */
    export async function addSchedule(scheduleVO: ScheduleVO) {
        const { isDate, unableToMeet, scheduleDate } = scheduleVO;

        // isDate 인 경우 나, 상대방 모두 같은 일정을 갖도록 함
        if (isDate) {
            const cloneScheduleVO: ScheduleVO = {
                ...scheduleVO,
                owner: env.MAIL_ACCOUNTS.filter((email) => email !== userStore.user.email)[0],
            };
            await Collections.schedule.add(cloneScheduleVO);
        }

        // TODO: unableToMeet 새로 추가되는 일정에 맞추어 동일한 값 유지 최적화 필요
        await Collections.schedule.update(
            [
                {
                    fieldPath: 'scheduleDate',
                    opStr: '==',
                    value: scheduleDate,
                },
            ],
            {
                unableToMeet,
            },
        );

        await Collections.schedule.add(scheduleVO);
    }
}
