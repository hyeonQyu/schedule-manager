import { Schedule } from '@defines/defines';
import { Collections } from '@collections/Collections';
import { FormatUtil } from '@utils/FormatUtil';
import { ScheduleVO } from '@models/ScheduleVO';
import { loading } from '@components/common/loading/Loading';

export namespace ScheduleCalendarRequest {
    export async function getThisMonthSchedules(year: number, month: number, lastDate: number): Promise<Schedule[]> {
        loading.show();
        const { docs } = await Collections.schedule.getOrderBy('scheduleDate', [
            {
                fieldPath: 'scheduleDate',
                opStr: '>=',
                value: FormatUtil.calendarDateToString({ year, month, date: 1 }),
            },
            {
                fieldPath: 'scheduleDate',
                opStr: '<=',
                value: FormatUtil.calendarDateToString({ year, month, date: lastDate }),
            },
        ]);
        loading.hide();

        return docs.map((doc) => {
            const vo = doc.data() as ScheduleVO;
            const { owner, scheduleDate, name, startTime, endTime, location, isDate, unableToMeet } = vo;
            return {
                owner,
                scheduleDate: FormatUtil.stringToCalendarDate(scheduleDate),
                name,
                startTime: FormatUtil.stringToTime(startTime),
                endTime: FormatUtil.stringToTime(endTime),
                location,
                isDate,
                unableToMeet,
            };
        });
    }
}
