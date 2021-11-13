import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '@components/schedule-modal/ScheduleModal.scss';

const cx = classNames.bind(style);

export interface TimeSelectPartProps {
    title: string;
    hours: number;
    minutes: number;
    hoursList: number[];
    minutesList: number[];
    onChangeHours: (hours: number) => void;
    onChangeMinutes: (minutes: number) => void;
}

const TimeSelectPart = observer((props: TimeSelectPartProps) => {
    const { title, hours, minutes, hoursList, minutesList, onChangeHours, onChangeMinutes } = props;

    const onChange = (e: ChangeEvent<HTMLSelectElement>, callback: (value: number) => void) => {
        callback(Number(e.target.value));
    };

    return (
        <div className={cx('part')}>
            <h4>{title}</h4>
            <div className={cx('datetime')}>
                <select defaultValue={hours} onChange={(e) => onChange(e, onChangeHours)}>
                    {[
                        <option key={`${title}_hours`} value={-1}>
                            시
                        </option>,
                        ...hoursList.map((hours) => (
                            <option key={hours} value={hours}>
                                {hours}
                            </option>
                        )),
                    ]}
                </select>
                <select defaultValue={minutes} onChange={(e) => onChange(e, onChangeMinutes)}>
                    {[
                        <option key={`${title}_minutes`} value={-1}>
                            분
                        </option>,
                        ...minutesList.map((minutes) => (
                            <option key={minutes} value={minutes}>
                                {minutes}
                            </option>
                        )),
                    ]}
                </select>
            </div>
        </div>
    );
});

export default TimeSelectPart;
