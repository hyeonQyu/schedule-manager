import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../Navigation.scss';
import { useNavigate } from 'react-router-dom';
import { ENavigationType } from '@defines/defines';

const cx = classNames.bind(style);

export interface NavigationTabProps {
    href: string;
    type: ENavigationType;
}

const NavigationTab = observer((props: NavigationTabProps) => {
    const { href, type } = props;
    const navigate = useNavigate();

    const onClickTab = () => {
        navigate(href);
    };

    const isActive = () => location.hash.replace('#', '') === href;

    return (
        <div className={cx('tab', isActive() && 'active')} onClick={onClickTab}>
            <div className={cx('img', type)} />
        </div>
    );
});

export default NavigationTab;
