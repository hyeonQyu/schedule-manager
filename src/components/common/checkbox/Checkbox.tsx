import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import style from './Checkbox.scss';

const cx = classNames.bind(style);

export interface CheckboxProps {
    checked?: boolean;
    size?: number;
    onChange?: (checked: boolean) => void;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
}

const Checkbox = (props: CheckboxProps) => {
    const { checked = false, children, className, size = 1, onChange = () => {}, disabled = false } = props;

    const checkboxSizeStyle = {
        width: `${size}rem`,
        height: `${size}rem`,
    };

    const changeChecked = () => {
        if (disabled) return;
        onChange(!checked);
    };

    return (
        <div className={classNames(className, cx('wrapper'))} onClick={changeChecked}>
            <div className={cx('checkbox', checked && 'checked', disabled && 'disabled')} style={checkboxSizeStyle} />
            {children && <div>{children}</div>}
        </div>
    );
};

export default Checkbox;
