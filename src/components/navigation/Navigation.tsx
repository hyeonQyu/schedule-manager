import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Navigation.scss';
import NavigationTab from '@components/navigation/components/NavigationTab';
import { ENavigationType } from '@defines/defines';

const cx = classNames.bind(style);

const Navigation = observer(() => {
    return (
        <div className={cx('wrapper')}>
            <NavigationTab href={'/'} type={ENavigationType.ENTIRE} />
            <NavigationTab href={'/weekly'} type={ENavigationType.WEEKLY} />
            <NavigationTab href={'/statistics'} type={ENavigationType.STATISTICS} />
        </div>
    );
});

export default Navigation;
