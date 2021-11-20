import React from 'react';
import { observer } from 'mobx-react';
import ScheduleCalendarStore from '@components/common/schedule-calendar/store/ScheduleCalendarStore';
import { EYear } from '@defines/defines';

const store = ScheduleCalendarStore.instance;

const ScheduleCalendarYearSelect = observer(() => {
    const { year, setYear } = store;

    return (
        <select defaultValue={year} onChange={(e) => setYear(Number(e.target.value))}>
            {(() => {
                const yearOptions = [];
                for (let i = EYear.MIN_YEAR; i <= EYear.MAX_YEAR; i++) {
                    yearOptions.push(
                        <option key={i} value={i}>
                            {i}년
                        </option>,
                    );
                }
                return yearOptions;
            })()}
        </select>
    );
});

export default ScheduleCalendarYearSelect;
