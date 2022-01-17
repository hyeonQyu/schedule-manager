import { Collections } from '@collections/Collections';
import env from '../env';
import firebase from 'firebase/app';
import UserStore from '@stores/userStore';
import { ScheduleVO } from '@models/ScheduleVO';
import { loading } from '@components/common/loading/Loading';
import { CalendarDate, Schedule, StarSchedule } from '@defines/defines';
import { FormatUtil } from '@utils/FormatUtil';
import { DocumentData } from '@defines/firebaseDefines';
import { DateInfoVO } from '@models/DateInfoVO';
import { StarScheduleVO } from '@models/StarScheduleVO';

export namespace ScheduleModalRequest {
    const userStore = UserStore.instance;

    /**
     * 일정 추가
     */
    export async function addSchedule(schedule: Schedule) {
        loading.show();
        const scheduleVO = (() => {
            const { owner, scheduleDate, name, startTime, endTime, location, isDate, unableToMeet } = schedule;
            return {
                owner,
                scheduleDate: FormatUtil.calendarDateToString(scheduleDate),
                name,
                startTime: FormatUtil.timeToString(startTime),
                endTime: FormatUtil.timeToString(endTime),
                location,
                isDate,
                unableToMeet,
                createdDatetime: new Date(),
            };
        })();

        const { isDate } = scheduleVO;

        await syncUnableToMeet(scheduleVO);
        await Collections.schedule.add(scheduleVO);
        if (isDate) {
            await Collections.schedule.add(getClonedDateSchedule(scheduleVO));
        }

        loading.hide();
    }

    /**
     * 해당 날의 못 만나는 날 여부 반환
     * @param date
     */
    export async function getUnableToMeetOfDate(date: CalendarDate): Promise<boolean> {
        const { docs } = await getDateInfoByDate(FormatUtil.calendarDateToString(date));
        if (docs.length === 0) return false;
        return (docs[0].data() as DateInfoVO).unableToMeet;
    }

    /**
     * 자주 사용하는 일정으로 등록
     * @param schedule
     */
    export async function registerStarSchedule(schedule: StarSchedule) {
        const { name, startTime, endTime, location } = schedule;

        loading.show();
        await Collections.starSchedule.add({
            author: userStore.userEmail,
            name,
            startTime: FormatUtil.timeToString(startTime),
            endTime: FormatUtil.timeToString(endTime),
            location,
            createdDatetime: new Date(),
        });
        loading.hide();
    }

    /**
     * 자주 사용하는 일정 목록 불러오기
     */
    export async function getStarSchedules(): Promise<StarSchedule[]> {
        loading.show();
        const { docs } = await Collections.starSchedule.getOrderBy({ fieldPath: 'createdDatetime', directionStr: 'desc' }, [
            {
                fieldPath: 'author',
                opStr: '==',
                value: userStore.userEmail,
            },
        ]);
        loading.hide();

        return getStarScheduleListFromStarScheduleVODocs(docs);
    }

    /**
     * 날짜 정보를 불러옴
     * @param date
     * @private
     */
    async function getDateInfoByDate(date: string): Promise<firebase.firestore.QuerySnapshot<DocumentData>> {
        return Collections.dateInfo.get([{ fieldPath: 'date', opStr: '==', value: date }]);
    }

    /**
     * 한 날짜의 못 만나는 날 여부 동기화
     * @param scheduleVO
     * @private
     */
    async function syncUnableToMeet(scheduleVO: ScheduleVO) {
        const { unableToMeet, scheduleDate } = scheduleVO;

        const { docs } = await getDateInfoByDate(scheduleDate);

        // 현재 날짜의 첫 일정 추가
        if (docs.length === 0) {
            await Collections.dateInfo.add({ date: scheduleDate, unableToMeet });
            return;
        }

        await Collections.dateInfo.updateByDocs({ unableToMeet }, docs);

        // unableToMeet 새로 추가되는 일정에 맞추어 동일한 값 유지
        await Collections.schedule.updateByWhereConditions(
            {
                unableToMeet,
            },
            [
                {
                    fieldPath: 'scheduleDate',
                    opStr: '==',
                    value: scheduleDate,
                },
                {
                    fieldPath: 'unableToMeet',
                    opStr: '==',
                    value: !unableToMeet,
                },
            ],
        );
    }

    /**
     * 데이트인 경우 상대방에게 같은 일정 생성
     * @param scheduleVO
     * @private
     */
    function getClonedDateSchedule(scheduleVO: ScheduleVO): ScheduleVO {
        return {
            ...scheduleVO,
            owner: env.MAIL_ACCOUNTS.filter((email) => email !== userStore.userEmail)[0],
        };
    }

    /**
     * VO 객체를 프론트에서 사용하는 타입의 객체로 변환
     * @param docs
     * @private
     */
    function getStarScheduleListFromStarScheduleVODocs(docs: firebase.firestore.QueryDocumentSnapshot<DocumentData>[]): StarSchedule[] {
        return docs.map((doc) => {
            const vo = doc.data() as StarScheduleVO;
            const { author, name, startTime, endTime, location, createdDatetime } = vo;
            return {
                author,
                name,
                startTime: FormatUtil.stringToTime(startTime),
                endTime: FormatUtil.stringToTime(endTime),
                location,
                createdDatetime,
            };
        });
    }
}
