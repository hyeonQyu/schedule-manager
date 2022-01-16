import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../../../ScheduleModal.scss';
import ScheduleAddModalStore from '@components/schedule-modal/store/ScheduleAddModalStore';

const cx = classNames.bind(style);

const store = ScheduleAddModalStore.instance;

const ScheduleLocationPart = observer(() => {
    const { location, setLocation } = store;

    return (
        <div className={cx('part')}>
            <h4>장소</h4>
            <input placeholder={'장소를 입력하세요.'} value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
    );
});

export default ScheduleLocationPart;
