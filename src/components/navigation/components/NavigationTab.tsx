import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from '../Navigation.scss';
import { ENavigationTab } from '@defines/defines';
import NavigationStore from '@stores/NavigationStore';
import { RouteComponentProps } from 'react-router-dom';

const cx = classNames.bind(style);

const store = NavigationStore.instance;

export interface NavigationTabProps extends RouteComponentProps {
    tab: ENavigationTab;
    text: string;
    href: string;
}

const NavigationTab = observer((props: NavigationTabProps) => {
    const { tab, text, href, history } = props;
    const { currentTab, setCurrentTab } = store;

    const onClickTab = () => {
        setCurrentTab(tab);
        history.push(href);
    };

    return (
        <div className={cx('tab', currentTab === tab && 'active')} onClick={onClickTab}>
            {text}
        </div>
    );
});

export default NavigationTab;
