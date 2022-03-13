import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../ScheduleCalendar.scss';
import ScheduleCalendarStore from '@components/schedule-calendar/store/ScheduleCalendarStore';
import { EWeek, Position } from '@defines/defines';
import ScheduleCalendarDateCell from '@components/schedule-calendar/componenets/ScheduleCalendarDateCell';
import Swipeable from '@components/swipeable/Swipeable';

const cx = classNames.bind(style);

const store = ScheduleCalendarStore.instance;

const ScheduleCalendarDates = observer(() => {
    const { dateList } = store;
    if (dateList?.length === 0) return null;

    const SWIPE_MIN_RANGE = 80;
    const { toPrevMonth, toNextMonth } = store;

    const changeMonth = (diff: Position) => {
        const isChange = Math.abs(diff.x) > SWIPE_MIN_RANGE;
        if (isChange) {
            diff.x < 0 ? toPrevMonth() : toNextMonth();
        }
    };

    return (
        <Swipeable onTouchEnd={changeMonth} className={cx('dates')}>
            {(() => {
                const dateRowList = [];

                for (let i = 0; i < EWeek.MAX_WEEK; i++) {
                    const dateCellList = [];

                    for (let j = 0; j < EWeek.DATES_PER_WEEK; j++) {
                        const index = i * EWeek.DATES_PER_WEEK + j;
                        // 한 주에 7일 채워넣기
                        dateCellList.push(<ScheduleCalendarDateCell key={index} dateInfo={dateList[index]} />);
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
        </Swipeable>
    );
});

export default ScheduleCalendarDates;
