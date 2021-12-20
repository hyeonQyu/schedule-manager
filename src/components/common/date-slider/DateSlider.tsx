import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import style from './DateSlider.scss';
import DateSlide from './DateSlide';
import { dayArray, EWeek } from '@defines/defines';

const cx = classNames.bind(style);

const DateSlider = () => {
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: false,
        dots: true,
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('days')}>
                {dayArray.map((day) => (
                    <div key={day} className={cx('day')}>
                        {day}
                    </div>
                ))}
            </div>
            <Slider {...settings}>
                {Array.from(Array(EWeek.MAX_WEEK), (e, i) => {
                    return <DateSlide key={i} />;
                })}
            </Slider>
        </div>
    );
};

export default DateSlider;
