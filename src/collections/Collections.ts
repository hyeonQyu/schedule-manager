import { ScheduleVO } from '@models/ScheduleVO';
import CollectionInstance from '@collections/CollectionInstance';
import { DateInfoVO } from '@models/DateInfoVO';
import { StarScheduleVO } from '@models/StarScheduleVO';

export namespace Collections {
    export const schedule = new CollectionInstance<ScheduleVO>('schedule');

    export const dateInfo = new CollectionInstance<DateInfoVO>('date info');

    export const starSchedule = new CollectionInstance<StarScheduleVO>('star schedule');
}
