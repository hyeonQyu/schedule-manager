import React from 'react';
import classNames from 'classnames/bind';
import style from './DateSlide.scss';
import { observer } from 'mobx-react-lite';
import { WeekProps } from '@defines/defines';

const cx = classNames.bind(style);

export interface DateSlideProps extends WeekProps {}

const DateSlide = observer((props: DateSlideProps) => {
    const { thisWeekArr } = props;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('dates-container')}>
                {thisWeekArr.map((value, i) => (
                    <div className={cx('dates')} key={`date-${i}`}>
                        {value.date}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default DateSlide;
