import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../ScheduleCalendar.scss';

const cx = classNames.bind(style);

const ScheduleCalendarDates = observer(() => {
    return (
        <div className={cx('dates')}>
            <div className={cx('row')}>
                <div className={cx('date')}>
                    <p>1</p>
                    <ul>
                        <li className={cx('me')}>어쩌구어쩌구어쩌구어쩌구어쩌구</li>
                        <li className={cx('me')}>저쩌구?</li>
                        <li className={cx('other')}>저쩌구?</li>
                        <li className={cx('other')}>저쩌구?</li>
                        <li className={cx('me')}>저쩌구?</li>
                    </ul>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                    <ul>
                        <li className={cx('me')}>어쩌구어쩌구어쩌구어쩌구어쩌구</li>
                        <li className={cx('me')}>저쩌구?</li>
                        <li className={cx('other')}>저쩌구?</li>
                        <li className={cx('other')}>저쩌구?</li>
                        <li className={cx('me')}>저쩌구?</li>
                    </ul>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>25</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
                <div className={cx('date')}>
                    <p>1</p>
                </div>
            </div>
        </div>
    );
});

export default ScheduleCalendarDates;
