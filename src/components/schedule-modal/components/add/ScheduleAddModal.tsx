import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '@components/schedule-modal/ScheduleModal.scss';
import SlidingModal from '@components/common/sliding-modal/SlidingModal';
import ScheduleAddModalStore from '@components/schedule-modal/store/ScheduleAddModalStore';
import StarScheduleSelectPart from '@components/schedule-modal/components/common/star-schedule/StarScheduleSelectPart';
import ScheduleSelectedDatePart from '@components/schedule-modal/components/common/part/SelectedDatePart';
import ScheduleNamePart from '@components/schedule-modal/components/common/part/ScheduleNamePart';
import ScheduleTimePart from '@components/schedule-modal/components/common/part/ScheduleTimePart';
import ScheduleLocationPart from '@components/schedule-modal/components/common/part/ScheduleLocationPart';
import ScheduleStatusPart from '@components/schedule-modal/components/common/part/ScheduleStatusPart';
import ScheduleAddStarSchedulePart from '@components/schedule-modal/components/common/part/ScheduleAddStarSchedulePart';
import ArrowIcon from '@icons/arrow/ArrowIcon';
import { EArrowDirection } from '@defines/defines';

const cx = classNames.bind(style);

const store = ScheduleAddModalStore.instance;

const ScheduleAddModal = observer(() => {
    const { isOpened, close, confirm, selectedDate, isStarScheduleOpened } = store;

    if (!selectedDate) return null;

    const confirmNode = !isStarScheduleOpened && '완료';
    const cancelNode = isStarScheduleOpened ? <ArrowIcon direction={EArrowDirection.LEFT} /> : '닫기';

    return (
        <SlidingModal
            title={'일정 추가'}
            isOpened={isOpened}
            onClickConfirm={confirm}
            onClickCancel={close}
            confirmNode={confirmNode}
            cancelNode={cancelNode}
        >
            <div className={cx('wrapper')}>
                <div className={cx('new-schedule')}>
                    {/*선택한 날짜*/}
                    <ScheduleSelectedDatePart />

                    {/*일정 이름*/}
                    <ScheduleNamePart />

                    {/*시작 및 종료 시간*/}
                    <ScheduleTimePart />

                    {/*장소*/}
                    <ScheduleLocationPart />

                    {/*일정 상태*/}
                    <ScheduleStatusPart />

                    {/*자주 사용하는 일정으로 등록*/}
                    <ScheduleAddStarSchedulePart />
                </div>

                {/*자주 사용하는 일정 불러오기*/}
                <StarScheduleSelectPart />
            </div>
        </SlidingModal>
    );
});

export default ScheduleAddModal;
