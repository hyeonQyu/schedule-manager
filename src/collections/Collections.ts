import { ScheduleVO } from '@models/ScheduleVO';
import CollectionInstance from '@collections/CollectionInstance';

export namespace Collections {
    export const schedule = new CollectionInstance<ScheduleVO>('schedule');
}
