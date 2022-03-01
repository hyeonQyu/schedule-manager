import React from 'react';
import { observer } from 'mobx-react';
import TimeSelectPart from '@components/schedule-modal/components/common/date-time/TimeSelectPart';
import { Time } from '@defines/defines';

export interface ScheduleTimePartProps {
    startTime: Time;
    endTime: Time;
    startHourList: number[];
    endHourList: number[];
    startMinuteList: number[];
    endMinuteList: number[];
    setStartTime: (time: Time) => void;
    setEndTime: (time: Time) => void;
}

const ScheduleTimePart = observer((props: ScheduleTimePartProps) => {
    const { startTime, endTime, startHourList, endHourList, startMinuteList, endMinuteList, setStartTime, setEndTime } = props;
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
