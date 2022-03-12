import { CalendarDate, DateInfo, Schedule, WhereCondition } from '@defines/defines';
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
     * @param lastCalendarDateOfMonth
     */
    export async function getSchedulesOfMonth(lastCalendarDateOfMonth: CalendarDate): Promise<Schedule[]> {
        const { year, month, date: lastDate } = lastCalendarDateOfMonth;

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
     * @param calendarDate
     */
    export async function getSchedulesOfWeek(calendarDate: CalendarDate): Promise<Schedule[]> {
        loading.show();
        const { firstDate, lastDate } = DateUtil.getFirstAndLastDateOfWeek(calendarDate);
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
     * 특정 주 일정 정보 목록 조회
     * @param calendarDate
     */
    export async function getDateInfosOfWeek(calendarDate: CalendarDate): Promise<DateInfo[]> {
        const scheduleList = await getSchedulesOfWeek(calendarDate);
        const scheduleMap = new Map<string, Schedule[]>();

        scheduleList.forEach((schedule) => {
            const key = FormatUtil.calendarDateToString(schedule.scheduleDate);
            if (scheduleMap.has(key)) {
                scheduleMap.get(key).push(schedule);
                return;
            }
            scheduleMap.set(key, [schedule]);
        });

        const dateList = DateUtil.getThisWeek(calendarDate);

        return dateList.map((calendarDate) => {
            return {
                calendarDate,
                scheduleList: scheduleMap.get(FormatUtil.calendarDateToString(calendarDate)),
            };
        });
    }

    /**
     * 특정 날 일정 목록 조회
     * @param calendarDate
     */
    export async function getSchedulesOfDate(calendarDate: CalendarDate): Promise<Schedule[]> {
        loading.show();
        const { docs } = await Collections.schedule.get([
            {
                fieldPath: 'scheduleDate',
                opStr: '==',
                value: FormatUtil.calendarDateToString(calendarDate),
            },
        ]);
        loading.hide();

        return getScheduleListFromScheduleVODocs(docs);
    }

    /**
     * 일정 삭제
     * @param schedule
     */
    export async function deleteSchedule(schedule: Schedule) {
        loading.show();

        const { isDate, owner, createdDatetime, scheduleDate } = schedule;

        const conditionList: WhereCondition[] = [
            {
                fieldPath: 'createdDatetime',
                opStr: '==',
                value: createdDatetime,
            },
        ];

        if (!isDate) {
            conditionList.push({
                fieldPath: 'owner',
                opStr: '==',
                value: owner,
            });
        }

        await Collections.schedule.deleteByWhereConditions(conditionList);
        await deleteDateInfoWhenNoSchedule(scheduleDate);

        loading.hide();
    }

    /**
     * ScheduleVO를 가진 docs 에서 Schedule 목록을 반환
     * @param docs
     * @private
     */
    export function getScheduleListFromScheduleVODocs(docs: firebase.firestore.QueryDocumentSnapshot<DocumentData>[]): Schedule[] {
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

    /**
     * 특정 날짜에 일정이 없는 경우 date info 삭제
     * @param scheduleDate
     * @private
     */
    async function deleteDateInfoWhenNoSchedule(scheduleDate: CalendarDate) {
        const date = FormatUtil.calendarDateToString(scheduleDate);

        const { docs } = await Collections.schedule.get([
            {
                fieldPath: 'scheduleDate',
                opStr: '==',
                value: date,
            },
        ]);

        if (docs.length === 0) {
            await Collections.dateInfo.deleteByWhereConditions([
                {
                    fieldPath: 'date',
                    opStr: '==',
                    value: date,
                },
            ]);
        }
    }
}
