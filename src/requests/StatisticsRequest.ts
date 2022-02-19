import { CalendarDate, MonthlyStatisticsInfo, WeeklyStatisticsInfo } from '@defines/defines';
import { ScheduleCalendarRequest } from '@requests/ScheduleCalendarRequest';
import UserStore from '@stores/UserStore';
import { loading } from '@components/common/loading/Loading';
import { Collections } from '@collections/Collections';
import { FormatUtil } from '@utils/FormatUtil';

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

    /**
     * 월간 통계 정보 조회
     * @param calendarDate
     */
    export async function getMonthlyStatisticsInfo(calendarDate: CalendarDate): Promise<MonthlyStatisticsInfo> {
        const { year, month } = calendarDate;
        loading.show();

        const { docs } = await Collections.schedule.getOrderBy({ fieldPath: 'scheduleDate' }, [
            {
                fieldPath: 'scheduleDate',
                opStr: '>=',
                value: FormatUtil.calendarDateToString({ year, month, date: 1 }),
            },
            {
                fieldPath: 'scheduleDate',
                opStr: '<',
                value: FormatUtil.calendarDateToString({ year, month: month + 1, date: 0 }),
            },
        ]);

        const scheduleList = ScheduleCalendarRequest.getScheduleListFromScheduleVODocs(docs);
        const datedDateSet = new Set<string>();

        scheduleList.forEach(({ scheduleDate, isDate }) => {
            if (isDate) {
                datedDateSet.add(FormatUtil.calendarDateToString(scheduleDate));
            }
        });

        const calendarDateWithDateList = [];
        for (const dateString of datedDateSet) {
            calendarDateWithDateList.push(FormatUtil.stringToCalendarDate(dateString));
        }

        loading.hide();
        return {
            calendarDateWithDateList,
        };
    }
}
