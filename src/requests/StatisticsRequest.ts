import { CalendarDate, WeeklyStatisticsInfo } from '@defines/defines';
import { ScheduleCalendarRequest } from '@requests/ScheduleCalendarRequest';
import UserStore from '@stores/UserStore';

export namespace StatisticsRequest {
    const userStore = UserStore.instance;

    /**
     * 주간 통계 정보 조회
     * @param calendarDate
     */
    export async function getWeeklyStatisticsInfo(calendarDate: CalendarDate): Promise<WeeklyStatisticsInfo> {
        const dateInfoList = await ScheduleCalendarRequest.getDateInfosOfWeek(calendarDate);

        let maxScheduleCount = 0;

        const weeklyStatisticsDateInfoList = dateInfoList.map(({ calendarDate, scheduleList }) => {
            let myScheduleCount = 0;
            let otherScheduleCount = 0;

            scheduleList?.forEach(({ owner }) => {
                userStore.isMe(owner) ? myScheduleCount++ : otherScheduleCount++;
            });

            maxScheduleCount = Math.max(maxScheduleCount, Math.max(myScheduleCount, otherScheduleCount));

            return {
                calendarDate,
                scheduleCountInfo: {
                    me: myScheduleCount,
                    other: otherScheduleCount,
                },
            };
        });

        return {
            weeklyStatisticsDateInfoList,
            maxScheduleCount,
        };
    }
}
