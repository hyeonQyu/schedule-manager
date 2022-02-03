import { OrderByDirection, WhereFilterOp } from '@defines/firebaseDefines';
import firebase from 'firebase/app';

export enum EDialogType {
    ALERT,
    CONFIRM,
}

export enum ENavigationType {
    ENTIRE = 'entire',
    WEEKLY = 'weekly',
    OTHER = 'other',
}

export enum EYear {
    MIN_YEAR = 2019,
    MAX_YEAR = 2030,
}

export enum EWeek {
    MAX_WEEK = 6,
    DATES_PER_WEEK = 7,
}

export enum EDay {
    MAX_DAY = 6,
}

export enum EArrowDirection {
    LEFT = 180,
    RIGHT = 0,
    UP = -90,
    DOWN = 90,
}

export interface CalendarDate {
    date: number;
    month: number;
    year: number;
}

export interface Time {
    hour: number;
    minute: number;
}

export interface DateInfo {
    calendarDate: CalendarDate;
    scheduleList?: Schedule[];
}

export interface Schedule {
    owner: string;
    scheduleDate: CalendarDate;
    startTime: Time;
    endTime: Time;
    name: string;
    location?: string;
    isDate?: boolean;
    unableToMeet?: boolean;
    createdDatetime?: Date;
}

export type StarSchedule = Pick<Schedule, 'name' | 'startTime' | 'endTime' | 'location' | 'createdDatetime'>;

export interface WhereCondition {
    /** 조건을 비교할 field 이름 */
    fieldPath: string;
    /** 비교연산자 */
    opStr: WhereFilterOp;
    /** 조건을 만족하는 값 */
    value: any;
}

export interface OrderByParams {
    /** 정렬할 필드 이름 */
    fieldPath: string | firebase.firestore.FieldPath;
    /** 정렬 방향 */
    directionStr?: OrderByDirection;
}

export const dayList = ['일', '월', '화', '수', '목', '금', '토'];
