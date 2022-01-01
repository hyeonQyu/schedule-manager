import Datetime from '@utils/Datetime';

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

export interface Schedule {
    startDatetime: Datetime;
    endDatetime: Datetime;
    name: string;
    location?: string;
}

export const dayArray = ['일', '월', '화', '수', '목', '금', '토'];

export interface WeekProps {
    thisWeekArr: CalendarDate[];
}
