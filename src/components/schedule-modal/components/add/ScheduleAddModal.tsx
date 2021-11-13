import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '@components/schedule-modal/ScheduleModal.scss';
import SlidingModal from '@components/common/sliding-modal/SlidingModal';
import ScheduleAddModalStore from '@components/schedule-modal/store/ScheduleAddModalStore';
import DateSelectPart from '@components/schedule-modal/components/common/DateSelectPart';
import TimeSelectPart from '@components/schedule-modal/components/common/TimeSelectPart';

const cx = classNames.bind(style);

const store = ScheduleAddModalStore.instance;

const ScheduleAddModal = observer(() => {
    const {
        isOpened,
        close,
        startDatetime,
        endDatetime,
        yearList,
        startMonthList,
        endMonthList,
        startDateList,
        endDateList,
        setStartYear,
        setStartMonth,
        setStartDate,
        setStartHours,
        setStartMinutes,
        setEndYear,
        setEndMonth,
        setEndDate,
        setEndHours,
        setEndMinutes,
        hoursList,
        minutesList,
    } = store;

    return (
        <SlidingModal title={'일정 추가'} isOpened={true} onClickConfirm={() => {}} onClickCancel={close}>
            <div className={cx('wrapper')}>
                <div className={cx('part')}>
                    <h4>선택한 날짜</h4>
                    <p>2021. 11. 12 (수)</p>
                </div>

                <div className={cx('part')}>
                    <h4>일정</h4>
                    <input placeholder={'일정의 이름을 입력하세요.'} />
                </div>

                <DateSelectPart
                    title={'시작 일'}
                    year={startDatetime.year}
                    month={startDatetime.month}
                    date={startDatetime.date}
                    yearList={yearList}
                    monthList={startMonthList}
                    dateList={startDateList}
                    onChangeYear={setStartYear}
                    onChangeMonth={setStartMonth}
                    onChangeDate={setStartDate}
                    disabled
                />

                <TimeSelectPart
                    title={'시작 시간'}
                    hours={startDatetime.hours}
                    minutes={startDatetime.minutes}
                    hoursList={hoursList}
                    minutesList={minutesList}
                    onChangeHours={setStartHours}
                    onChangeMinutes={setStartMinutes}
                />

                <DateSelectPart
                    title={'종료 일'}
                    year={endDatetime.year}
                    month={endDatetime.month}
                    date={endDatetime.date}
                    yearList={yearList}
                    monthList={endMonthList}
                    dateList={endDateList}
                    onChangeYear={setEndYear}
                    onChangeMonth={setEndMonth}
                    onChangeDate={setEndDate}
                />

                <TimeSelectPart
                    title={'종료 시간'}
                    hours={endDatetime.hours}
                    minutes={endDatetime.minutes}
                    hoursList={hoursList}
                    minutesList={minutesList}
                    onChangeHours={setEndHours}
                    onChangeMinutes={setEndMinutes}
                />

                <div className={cx('part')}>
                    <h4>위치</h4>
                    <input placeholder={'위치를 입력하세요.'} />
                </div>
            </div>
        </SlidingModal>
    );
});

export default ScheduleAddModal;
