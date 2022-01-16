import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../../../ScheduleModal.scss';
import ScheduleAddModalStore from '@components/schedule-modal/store/ScheduleAddModalStore';
import StarScheduleCard from '@components/schedule-modal/components/common/star-schedule/components/StarScheduleCard';

const cx = classNames.bind(style);

const store = ScheduleAddModalStore.instance;

const StarScheduleSelectPart = observer(() => {
    const { isStarScheduleOpened, starScheduleList } = store;

    return (
        <div className={cx('star-schedule-select', isStarScheduleOpened && 'opened')}>
            <div className={cx('part', 'part__schedule-star')}>
                <h4>자주 사용하는 일정</h4>
                <ul className={cx('star-schedule-list')}>
                    {starScheduleList.map((starSchedule) => {
                        return <StarScheduleCard key={starSchedule.createdDatetime.toLocaleString()} starSchedule={starSchedule} />;
                    })}
                </ul>
            </div>
        </div>
    );
});

export default StarScheduleSelectPart;
