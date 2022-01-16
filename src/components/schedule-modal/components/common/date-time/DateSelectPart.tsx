import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '@components/schedule-modal/ScheduleModal.scss';

const cx = classNames.bind(style);

export interface DateSelectPartProps {
    title: string;
    year: number;
    month: number;
    date: number;
    yearList: number[];
    monthList: number[];
    dateList: number[];
    onChangeYear: (year: number) => void;
    onChangeMonth: (month: number) => void;
    onChangeDate: (date: number) => void;
    disabled?: boolean;
}

const DateSelectPart = observer((props: DateSelectPartProps) => {
    const { title, year, month, date, yearList, monthList, dateList, onChangeYear, onChangeMonth, onChangeDate, disabled = false } = props;

    const onChange = (e: ChangeEvent<HTMLSelectElement>, callback: (value: number) => void) => {
        callback(Number(e.target.value));
    };

    return (
        <div className={cx('part')}>
            <h4>{title}</h4>
            <div className={cx('datetime')}>
                <select defaultValue={year} disabled={disabled} onChange={(e) => onChange(e, onChangeYear)}>
                    {[
                        <option key={`${title}_year`} value={0}>
                            년
                        </option>,
                        ...yearList.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        )),
                    ]}
                </select>
                <select defaultValue={month} disabled={disabled} onChange={(e) => onChange(e, onChangeMonth)}>
                    {[
                        <option key={`${title}_month`} value={0}>
                            월
                        </option>,
                        ...monthList.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        )),
                    ]}
                </select>
                <select defaultValue={date} disabled={disabled} onChange={(e) => onChange(e, onChangeDate)}>
                    {[
                        <option key={`${title}_date`} value={0}>
                            일
                        </option>,
                        ...dateList.map((date) => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        )),
                    ]}
                </select>
            </div>
        </div>
    );
});

export default DateSelectPart;
