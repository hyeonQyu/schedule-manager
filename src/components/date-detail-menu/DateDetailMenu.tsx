import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './DateDetailMenu.scss';
import ScheduleCalendarStore from '@components/schedule-calendar/store/ScheduleCalendarStore';
import ArrowIcon from '@icons/arrow/ArrowIcon';
import { EArrowDirection, Position, SWIPE_MIN_RANGE } from '@defines/defines';
import ScheduleAddButton from '@components/date-detail-menu/components/ScheduleAddButton';
import DateDetailMenuCard from '@components/date-detail-menu/components/DateDetailMenuCard';
import Swipeable from '@components/swipeable/Swipeable';

const cx = classNames.bind(style);

const calendarStore = ScheduleCalendarStore.instance;

const DateDetailMenu = observer(() => {
    const { selectCalendarDate, selectedCalendarDate, selectedDateScheduleList } = calendarStore;

    const close = () => selectCalendarDate(null);

    const onSwipeDown = (diff: Position) => {
        if (Math.abs(diff.y) > SWIPE_MIN_RANGE && diff.y < 0) {
            close();
        }
    };

    return (
        <Swipeable onTouchEnd={onSwipeDown} className={cx('wrapper', selectedCalendarDate && 'open')}>
            {selectedCalendarDate && (
                <>
                    <div className={cx('header')} onClick={close}>
                        <ArrowIcon direction={EArrowDirection.DOWN} color={'#c2b7c2'} />
                    </div>

                    <div className={cx('body')}>
                        <div className={cx('card-wrapper')}>
                            {selectedDateScheduleList.map((schedule) => {
                                const { owner, name, createdDatetime } = schedule;
                                return <DateDetailMenuCard schedule={schedule} key={`${owner}_${name}_${createdDatetime?.toLocaleString()}`} />;
                            })}
                        </div>

                        <ScheduleAddButton />
                    </div>
                </>
            )}
        </Swipeable>
    );
});

export default DateDetailMenu;
