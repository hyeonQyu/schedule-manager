import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../../../ScheduleModal.scss';
import ScheduleAddModalStore from '@components/schedule-modal/store/ScheduleAddModalStore';
import Checkbox from '@components/common/checkbox/Checkbox';

const cx = classNames.bind(style);

const store = ScheduleAddModalStore.instance;

const ScheduleStatusPart = observer(() => {
    const { isDate, unableToMeet, toggleIsDate, toggleUnableToMeet } = store;

    return (
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
    );
});

export default ScheduleStatusPart;
