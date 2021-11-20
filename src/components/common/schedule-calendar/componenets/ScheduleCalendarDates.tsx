import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../ScheduleCalendar.scss';
import ScheduleCalendarStore from '@components/common/schedule-calendar/store/ScheduleCalendarStore';
import { EMonthType, EWeek } from '@defines/defines';

const cx = classNames.bind(style);

const store = ScheduleCalendarStore.instance;

const ScheduleCalendarDates = observer(() => {
    const { dateList } = store;

    return (
        <div className={cx('dates')}>
            {(() => {
                const dateRowList = [];

                for (let i = 0; i < EWeek.MAX_WEEK; i++) {
                    const dateCellList = [];

                    for (let j = 0; j < EWeek.DATES_PER_WEEK; j++) {
                        const index = i * EWeek.DATES_PER_WEEK + j;
                        const { date, monthType } = dateList[index];
                        const disabled = monthType !== EMonthType.THIS_MONTH;

                        // 한 주에 7일 채워넣기
                        dateCellList.push(
                            <div key={index} className={cx('date', disabled && 'disabled')}>
                                <p>{date}</p>
                            </div>,
                        );
                    }

                    // 한 달에 6주 채워넣기
                    dateRowList.push(
                        <div key={i} className={cx('row')}>
                            {dateCellList}
                        </div>,
                    );
                }

                return dateRowList;
            })()}
        </div>
    );
});

export default ScheduleCalendarDates;
