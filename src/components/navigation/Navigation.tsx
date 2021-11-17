import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Navigation.scss';
import NavigationTab from '@components/navigation/components/NavigationTab';
import { RouteComponentProps } from 'react-router-dom';
import { ENavigationType } from '@defines/defines';

const cx = classNames.bind(style);

const Navigation = observer((props: RouteComponentProps) => {
    return (
        <div className={cx('wrapper')}>
            <NavigationTab href={'/'} type={ENavigationType.ENTIRE} {...props} />
            <NavigationTab href={'/my'} type={ENavigationType.ME} {...props} />
            <NavigationTab href={'/other'} type={ENavigationType.OTHER} {...props} />
        </div>
    );
});

export default Navigation;
