import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../../../../ScheduleModal.scss';
import { StarSchedule } from '@defines/defines';
import { FormatUtil } from '@utils/FormatUtil';

const cx = classNames.bind(style);

export interface StarScheduleProps {
    starSchedule: StarSchedule;
}

const StarScheduleCard = observer((props: StarScheduleProps) => {
    const { starSchedule } = props;
    const { name, startTime, endTime, location } = starSchedule;

    return (
        <li className={cx('star-schedule')}>
            <p className={cx('name')}>{name}</p>
            <div className={cx('detail')}>
                <span>
                    {FormatUtil.timeToString(startTime)} ~ {FormatUtil.timeToString(endTime)}
                </span>
                {location && <span>|</span>}
                <span>{location}</span>
            </div>
        </li>
    );
});

export default StarScheduleCard;
