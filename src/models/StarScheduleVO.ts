import { ScheduleVO } from '@models/ScheduleVO';

export interface StarScheduleVO extends Pick<ScheduleVO, 'name' | 'startTime' | 'endTime' | 'location' | 'createdDatetime'> {
    author: string;
}
