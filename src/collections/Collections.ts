import { ScheduleVO } from '@models/ScheduleVO';
import CollectionInstance from '@collections/CollectionInstance';
import { DateInfoVO } from '@models/DateInfoVO';

export namespace Collections {
    export const schedule = new CollectionInstance<ScheduleVO>('schedule');

    export const dateInfo = new CollectionInstance<DateInfoVO>('date info');
}
