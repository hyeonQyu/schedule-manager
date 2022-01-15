import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './DateDetailMenu.scss';
import ScheduleCalendarStore from '@components/schedule-calendar/store/ScheduleCalendarStore';
import ArrowIcon from '@icons/arrow/ArrowIcon';
import { EArrowDirection } from '@defines/defines';
import Card from '@components/card/Card';
import ScheduleAddButton from '@components/date-detail-menu/components/ScheduleAddButton';

const cx = classNames.bind(style);

const calendarStore = ScheduleCalendarStore.instance;

const DateDetailMenu = observer(() => {
    const { selectCalendarDate, selectedCalendarDate } = calendarStore;

    const close = () => selectCalendarDate(null);

    return (
        <div className={cx('wrapper', selectedCalendarDate && 'open')}>
            {selectedCalendarDate && (
                <>
                    <div className={cx('header')} onClick={close}>
                        <ArrowIcon direction={EArrowDirection.DOWN} color={'#c2b7c2'} />
                    </div>

                    <div className={cx('body')}>
                        <div className={cx('card-wrapper')}>
                            <Card
                                schedule={{
                                    scheduleDate: { year: 2021, month: 11, date: 24 },
                                    startTime: { hour: 10, minute: 0 },
                                    endTime: { hour: 13, minute: 20 },
                                    name: '뭐하기',
                                }}
                            />
                            <Card
                                schedule={{
                                    scheduleDate: { year: 2021, month: 11, date: 24 },
                                    startTime: { hour: 10, minute: 0 },
                                    endTime: { hour: 13, minute: 20 },
                                    name: '뭐하기',
                                }}
                            />
                            <Card
                                schedule={{
                                    scheduleDate: { year: 2021, month: 11, date: 24 },
                                    startTime: { hour: 10, minute: 0 },
                                    endTime: { hour: 13, minute: 20 },
                                    name: '뭐하기',
                                }}
                            />
                            <Card
                                schedule={{
                                    scheduleDate: { year: 2021, month: 11, date: 24 },
                                    startTime: { hour: 10, minute: 0 },
                                    endTime: { hour: 13, minute: 20 },
                                    name: '뭐하기',
                                }}
                            />
                        </div>

                        <ScheduleAddButton />
                    </div>
                </>
            )}
        </div>
    );
});

export default DateDetailMenu;
