import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../../../ScheduleModal.scss';
import Checkbox from '@components/common/checkbox/Checkbox';

const cx = classNames.bind(style);

export interface ScheduleStatusPartProps {
    isDate: boolean;
    unableToMeet: boolean;
    toggleIsDate: () => void;
    toggleUnableToMeet: () => void;
    isDateDisabled?: boolean;
}

const ScheduleStatusPart = observer((props: ScheduleStatusPartProps) => {
    const { isDate, unableToMeet, toggleIsDate, toggleUnableToMeet, isDateDisabled = false } = props;

    return (
        <div className={cx('part')}>
            <h4>일정 상태</h4>
            <div className={cx('schedule-status')}>
                <Checkbox checked={isDate} onChange={() => toggleIsDate()} disabled={isDateDisabled}>
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
