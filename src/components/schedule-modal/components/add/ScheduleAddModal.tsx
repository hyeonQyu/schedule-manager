import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '@components/schedule-modal/ScheduleModal.scss';
import SlidingModal from '@components/common/sliding-modal/SlidingModal';
import ScheduleAddModalStore from '@components/schedule-modal/store/ScheduleAddModalStore';
import TimeSelectPart from '@components/schedule-modal/components/common/TimeSelectPart';
import { dayArray } from '@defines/defines';
import Checkbox from '@components/common/checkbox/Checkbox';

const cx = classNames.bind(style);

const store = ScheduleAddModalStore.instance;

const ScheduleAddModal = observer(() => {
    const {
        isOpened,
        close,
        confirm,
        selectedDate,
        name,
        startTime,
        endTime,
        location,
        setName,
        setStartTime,
        setEndTime,
        setLocation,
        startHourList,
        startMinuteList,
        endHourList,
        endMinuteList,
        isDate,
        unableToMeet,
        toggleIsDate,
        toggleUnableToMeet,
    } = store;

    if (!selectedDate) return null;

    const { year, month, date } = selectedDate;
    const day = new Date(year, month - 1, date).getDay();

    return (
        <SlidingModal title={'일정 추가'} isOpened={isOpened} onClickConfirm={confirm} onClickCancel={close}>
            <div className={cx('wrapper')}>
                <div className={cx('part')}>
                    <h4>선택한 날짜</h4>
                    <p>
                        {year}. {month}. {date} ({dayArray[day]})
                    </p>
                </div>

                <div className={cx('part')}>
                    <h4>일정</h4>
                    <input placeholder={'일정의 이름을 입력하세요.'} value={name} onChange={(e) => setName(e.target.value)} />
                </div>

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

                <div className={cx('part')}>
                    <h4>위치</h4>
                    <input placeholder={'위치를 입력하세요.'} value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>

                <div className={cx('part')}>
                    <h4>일정 상태</h4>
                    <div className={cx('schedule-status')}>
                        <Checkbox checked={isDate} onChange={() => toggleIsDate()}>
                            데이트
                        </Checkbox>
                        <Checkbox checked={unableToMeet} onChange={() => toggleUnableToMeet()}>
                            못 만나는 날
                        </Checkbox>
                    </div>
                </div>
            </div>
        </SlidingModal>
    );
});

export default ScheduleAddModal;
