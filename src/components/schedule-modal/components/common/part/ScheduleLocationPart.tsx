import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../../../ScheduleModal.scss';

const cx = classNames.bind(style);

export interface ScheduleLocationPartProps {
    location: string;
    setLocation: (location: string) => void;
}

const ScheduleLocationPart = observer((props: ScheduleLocationPartProps) => {
    const { location, setLocation } = props;

    return (
        <div className={cx('part')}>
            <h4>장소</h4>
            <input placeholder={'장소를 입력하세요.'} value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
    );
});

export default ScheduleLocationPart;
