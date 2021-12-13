import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './DateDetailMenu.scss';
import ScheduleCalendarStore from '@components/common/schedule-calendar/store/ScheduleCalendarStore';
import ArrowIcon from '@icons/arrow/ArrowIcon';
import { EArrowDirection } from '@defines/defines';
import Card from '@components/card/Card';
import Datetime from '@utils/Datetime';

const cx = classNames.bind(style);

const calendarStore = ScheduleCalendarStore.instance;

export interface DateDetailMenuProps {}

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
                                    startDatetime: new Datetime(2021, 11, 12, 10, 0),
                                    endDatetime: new Datetime(2021, 11, 12, 10, 50),
                                    name: '뭐하기',
                                }}
                            />
                            <Card
                                schedule={{
                                    startDatetime: new Datetime(2021, 11, 12, 10, 0),
                                    endDatetime: new Datetime(2021, 11, 12, 10, 50),
                                    name: '뭐하기',
                                }}
                            />
                            <Card
                                schedule={{
                                    startDatetime: new Datetime(2021, 11, 12, 10, 0),
                                    endDatetime: new Datetime(2021, 11, 12, 10, 50),
                                    name: '뭐하기',
                                }}
                            />
                            <Card
                                schedule={{
                                    startDatetime: new Datetime(2021, 11, 12, 10, 0),
                                    endDatetime: new Datetime(2021, 11, 12, 10, 50),
                                    name: '뭐하기',
                                }}
                            />
                            <Card
                                schedule={{
                                    startDatetime: new Datetime(2021, 11, 12, 10, 0),
                                    endDatetime: new Datetime(2021, 11, 12, 10, 50),
                                    name: '뭐하기',
                                }}
                            />
                            <Card
                                schedule={{
                                    startDatetime: new Datetime(2021, 11, 12, 10, 0),
                                    endDatetime: new Datetime(2021, 11, 12, 10, 50),
                                    name: '뭐하기',
                                }}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
});

export default DateDetailMenu;
