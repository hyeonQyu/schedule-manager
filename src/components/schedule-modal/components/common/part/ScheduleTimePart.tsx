import React from 'react';
import { observer } from 'mobx-react';
import ScheduleAddModalStore from '@components/schedule-modal/store/ScheduleAddModalStore';
import TimeSelectPart from '@components/schedule-modal/components/common/date-time/TimeSelectPart';

const store = ScheduleAddModalStore.instance;

const ScheduleTimePart = observer(() => {
    const { startTime, endTime, startHourList, endHourList, startMinuteList, endMinuteList, setStartTime, setEndTime } = store;
    return (
        <>
            <TimeSelectPart
                title={'시작 시간'}
                hour={startTime.hour}
                minute={startTime.minute}
                hourList={startHourList}
                minuteList={startMinuteList}
                onChangeTime={setStartTime}
            />

            <TimeSelectPart
                title={'종료 시간'}
                hour={endTime.hour}
                minute={endTime.minute}
                hourList={endHourList}
                minuteList={endMinuteList}
                onChangeTime={setEndTime}
            />
        </>
    );
});

export default ScheduleTimePart;
