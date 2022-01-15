import React from 'react';
import { observer } from 'mobx-react';
import ScheduleCalendarStore from '@components/schedule-calendar/store/ScheduleCalendarStore';

const store = ScheduleCalendarStore.instance;

const ScheduleCalendarMonthSelect = observer(() => {
    const { curMonth, setCurMonth } = store;

    return (
        <select value={curMonth} onChange={(e) => setCurMonth(Number(e.target.value))}>
            {(() => {
                const monthOptions = [];
                for (let i = 1; i <= 12; i++) {
                    monthOptions.push(
                        <option key={i} value={i}>
                            {i}월
                        </option>,
                    );
                }
                return monthOptions;
            })()}
        </select>
    );
});

export default ScheduleCalendarMonthSelect;
