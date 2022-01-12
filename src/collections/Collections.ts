import CollectionInstance from '@/collections/CollectionInstance';
import { ScheduleVO } from '@models/ScheduleVO';

export namespace Collections {
    export const schedule = new CollectionInstance<ScheduleVO>('schedule');
}
