import React, { HTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import style from './Shortening.scss';

const cx = classNames.bind(style);

export interface ShorteningProps extends HTMLAttributes<any> {
    children: string;
    title?: string;
}

const Shortening = (props: ShorteningProps) => {
    const { children, title, ...rest } = props;

    return (
        <p className={cx('wrapper')} title={title ?? children} {...rest}>
            {children}
        </p>
    );
};

export default Shortening;
