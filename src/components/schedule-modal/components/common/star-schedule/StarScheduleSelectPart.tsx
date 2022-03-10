import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../../../ScheduleModal.scss';
import StarScheduleCard from '@components/schedule-modal/components/common/star-schedule/components/StarScheduleCard';
import { StarSchedule } from '@defines/defines';

const cx = classNames.bind(style);

export interface StarScheduleSelectPartProps {
    isStarScheduleOpened: boolean;
    starScheduleList: StarSchedule[];
    selectStarSchedule: (starSchedule: StarSchedule) => void;
}

const StarScheduleSelectPart = observer((props: StarScheduleSelectPartProps) => {
    const { isStarScheduleOpened, starScheduleList, selectStarSchedule } = props;

    return (
        <div className={cx('star-schedule-select', isStarScheduleOpened && 'opened')}>
            <div className={cx('part', 'part__schedule-star')}>
                <h4>자주 사용하는 일정</h4>
                <ul className={cx('star-schedule-list')}>
                    {starScheduleList.map((starSchedule) => {
                        return (
                            <StarScheduleCard
                                key={starSchedule.createdDatetime.toLocaleString()}
                                starSchedule={starSchedule}
                                onClick={() => selectStarSchedule(starSchedule)}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
});

export default StarScheduleSelectPart;
