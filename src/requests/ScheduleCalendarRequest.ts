import { Schedule } from '@defines/defines';
import { Collections } from '@collections/Collections';
import { FormatUtil } from '@utils/FormatUtil';
import { ScheduleVO } from '@models/ScheduleVO';
import { loading } from '@components/common/loading/Loading';
import firebase from 'firebase/app';
import { DocumentData } from '@defines/firebaseDefines';
import { DateUtil } from '@utils/DateUtil';

export namespace ScheduleCalendarRequest {
    /**
     * 특정 달 일정 목록 조회
     * @param year
     * @param month
     * @param lastDate
     */
    export async function getSchedulesOfMonth(year: number, month: number, lastDate: number): Promise<Schedule[]> {
        loading.show();
        const { docs } = await Collections.schedule.getOrderBy({ fieldPath: 'scheduleDate' }, [
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

        return getScheduleListFromScheduleVODocs(docs);
    }

    /**
     * 특정 주 일정 목록 조회
     * @param year
     * @param month
     * @param date
     */
    export async function getSchedulesOfWeek(year: number, month: number, date: number): Promise<Schedule[]> {
        loading.show();
        const dateList = DateUtil.getThisWeek({ year, month, date });
        const firstDate = dateList[0];
        const lastDate = dateList[6];

        const { docs } = await Collections.schedule.getOrderBy({ fieldPath: 'scheduleDate' }, [
            {
                fieldPath: 'scheduleDate',
                opStr: '>=',
                value: FormatUtil.calendarDateToString({ year: firstDate.year, month: firstDate.month, date: firstDate.date }),
            },
            {
                fieldPath: 'scheduleDate',
                opStr: '<=',
                value: FormatUtil.calendarDateToString({ year: lastDate.year, month: lastDate.month, date: lastDate.date }),
            },
        ]);
        loading.hide();

        return getScheduleListFromScheduleVODocs(docs);
    }

    /**
     * 특정 날 일정 목록 조회
     * @param year
     * @param month
     * @param date
     */
    export async function getSchedulesOfDate(year: number, month: number, date: number): Promise<Schedule[]> {
        loading.show();
        const { docs } = await Collections.schedule.get([
            {
                fieldPath: 'scheduleDate',
                opStr: '==',
                value: FormatUtil.calendarDateToString({ year, month, date }),
            },
        ]);
        loading.hide();

        return getScheduleListFromScheduleVODocs(docs);
    }

    function getScheduleListFromScheduleVODocs(docs: firebase.firestore.QueryDocumentSnapshot<DocumentData>[]): Schedule[] {
        return docs.map((doc) => {
            const vo = doc.data() as ScheduleVO;
            const { owner, scheduleDate, name, startTime, endTime, location, isDate, unableToMeet, createdDatetime } = vo;
            return {
                owner,
                scheduleDate: FormatUtil.stringToCalendarDate(scheduleDate),
                name,
                startTime: FormatUtil.stringToTime(startTime),
                endTime: FormatUtil.stringToTime(endTime),
                location,
                isDate,
                unableToMeet,
                createdDatetime,
            };
        });
    }
}
