import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../Navigation.scss';
import { RouteComponentProps } from 'react-router-dom';

const cx = classNames.bind(style);

export interface NavigationTabProps extends RouteComponentProps {
    text: string;
    href: string;
}

const NavigationTab = observer((props: NavigationTabProps) => {
    const { text, href, history } = props;

    const onClickTab = () => {
        history.push(href);
    };

    const isActive = () => location.hash.replace('#', '') === href;

    return (
        <div className={cx('tab', isActive() && 'active')} onClick={onClickTab}>
            {text}
        </div>
    );
});

export default NavigationTab;
