import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../../../ScheduleModal.scss';

const cx = classNames.bind(style);

export interface ScheduleAddStarSchedulePartProps {
    saveStarSchedule: () => void;
    openLoadStarSchedule: () => void;
}

const ScheduleAddStarSchedulePart = observer((props: ScheduleAddStarSchedulePartProps) => {
    const { saveStarSchedule, openLoadStarSchedule } = props;

    return (
        <div className={cx('part')}>
            <h4>자주 사용하는 일정으로 등록</h4>
            <div className={cx('schedule-star')}>
                <button className={cx('save')} onClick={saveStarSchedule}>
                    일정 저장
                </button>
                <button className={cx('load')} onClick={openLoadStarSchedule}>
                    일정 불러오기
                </button>
            </div>
        </div>
    );
});

export default ScheduleAddStarSchedulePart;
