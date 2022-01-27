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
}

const Checkbox = (props: CheckboxProps) => {
    const { checked = false, children, className, size = 1, onChange = () => {} } = props;

    const checkboxSizeStyle = {
        width: `${size}rem`,
        height: `${size}rem`,
    };

    return (
        <div className={classNames(className, cx('wrapper'))} onClick={() => onChange(!checked)}>
            <div className={cx('checkbox', checked && 'checked')} style={checkboxSizeStyle} />
            {children && <div>{children}</div>}
        </div>
    );
};

export default Checkbox;
