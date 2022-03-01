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
}

const ScheduleStatusPart = observer((props: ScheduleStatusPartProps) => {
    const { isDate, unableToMeet, toggleIsDate, toggleUnableToMeet } = props;

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
