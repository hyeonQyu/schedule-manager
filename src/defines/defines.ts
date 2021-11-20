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
    MIN_YEAR = 1950,
    MAX_YEAR = 2050,
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

export enum EMonthType {
    LAST_MONTH,
    THIS_MONTH,
    NEXT_MONTH,
}

export interface CalendarDate {
    date: number;
    monthType: EMonthType;
}
