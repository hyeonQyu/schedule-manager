export enum EDialogType {
    ALERT,
    CONFIRM,
}

export enum ENavigationType {
    ENTIRE = 'entire',
    ME = 'me',
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
    LEFT,
    RIGHT,
}

export interface CalendarDate {
    date: number;
    month: number;
    year: number;
}
