import React from 'react';
import classNames from 'classnames/bind';
import style from './ChartBar.scss';

const cx = classNames.bind(style);

export interface ChartBarProps {
    width: number | string;
    percentage: number;
    color: string;
}

const ChartBar = (props: ChartBarProps) => {
    const { width, percentage, color } = props;

    const chartBarOutsideStyle = {
        width: typeof(width) === 'number' ? `${width}px` : width,
        height: `${percentage}%`,
    };

    const chartBarInsideStyle = {
        background: color,
    };

    return (
        <div className={cx('wrapper')} style={chartBarOutsideStyle}>
            <div className={cx('inside')} style={chartBarInsideStyle}></div>
        </div>
    );
};

export default ChartBar;
