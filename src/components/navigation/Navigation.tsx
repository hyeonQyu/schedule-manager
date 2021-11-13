import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Navigation.scss';
import { ENavigationTab } from '@defines/defines';
import NavigationTab from '@components/navigation/components/NavigationTab';
import { RouteComponentProps } from 'react-router-dom';

const cx = classNames.bind(style);

const Navigation = observer((props: RouteComponentProps) => {
    return (
        <div className={cx('wrapper')}>
            <NavigationTab tab={ENavigationTab.ENTIRE} text={'전체 일정'} href={'/'} {...props} />
            <NavigationTab tab={ENavigationTab.MY} text={'내 일정'} href={'/my'} {...props} />
            <NavigationTab tab={ENavigationTab.OTHER} text={'상대 일정'} href={'/other'} {...props} />
        </div>
    );
});

export default Navigation;
