import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '@components/schedule-modal/ScheduleModal.scss';
import { Time } from '@defines/defines';

const cx = classNames.bind(style);

export interface TimeSelectPartProps {
    title: string;
    hour: number;
    minute: number;
    hourList: number[];
    minuteList: number[];
    onChangeTime: (time: Time) => void;
}

const TimeSelectPart = observer((props: TimeSelectPartProps) => {
    const { title, hour, minute, hourList, minuteList, onChangeTime } = props;

    const onChange = (e: ChangeEvent<HTMLSelectElement>, callback: (value: number) => void) => {
        callback(Number(e.target.value));
    };

    const onChangeHour = (hour) => onChangeTime({ hour, minute });
    const onChangeMinute = (minute) => onChangeTime({ hour, minute });

    return (
        <div className={cx('part')}>
            <h4>{title}</h4>
            <div className={cx('datetime')}>
                <select value={hour} onChange={(e) => onChange(e, onChangeHour)}>
                    {hourList.map((hour) => (
                        <option key={hour} value={hour}>
                            {hour}
                        </option>
                    ))}
                </select>
                <select value={minute} onChange={(e) => onChange(e, onChangeMinute)}>
                    {minuteList.map((minute) => (
                        <option key={minute} value={minute}>
                            {minute}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
});

export default TimeSelectPart;
