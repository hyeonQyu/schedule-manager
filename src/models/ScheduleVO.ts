export interface ScheduleVO {
    owner: string;
    scheduleDate: string;
    startTime: string;
    endTime: string;
    name: string;
    location?: string;
    isDate?: boolean;
    unableToMeet?: boolean;
}
