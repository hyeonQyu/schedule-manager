import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Navigation.scss';
import NavigationTab from '@components/navigation/components/NavigationTab';
import { RouteComponentProps } from 'react-router-dom';

const cx = classNames.bind(style);

const Navigation = observer((props: RouteComponentProps) => {
    return (
        <div className={cx('wrapper')}>
            <NavigationTab text={'전체 일정'} href={'/'} {...props} />
            <NavigationTab text={'내 일정'} href={'/my'} {...props} />
            <NavigationTab text={'상대 일정'} href={'/other'} {...props} />
        </div>
    );
});

export default Navigation;
