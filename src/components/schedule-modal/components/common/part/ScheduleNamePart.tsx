import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../../../ScheduleModal.scss';
import ScheduleAddModalStore from '@components/schedule-modal/store/ScheduleAddModalStore';

const cx = classNames.bind(style);

const store = ScheduleAddModalStore.instance;

const ScheduleNamePart = observer(() => {
    const { name, setName } = store;

    return (
        <div className={cx('part')}>
            <h4>일정</h4>
            <input placeholder={'일정의 이름을 입력하세요.'} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
    );
});

export default ScheduleNamePart;
