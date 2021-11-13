import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Layout.scss';
import Navigation from '@components/navigation/Navigation';
import { RouteComponentProps } from 'react-router-dom';

const cx = classNames.bind(style);

export interface LayoutProps extends RouteComponentProps {
    children?: ReactNode;
}

const Layout = observer((props: LayoutProps) => {
    const { children } = props;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>{children}</div>
            <Navigation {...props} />
        </div>
    );
});

export default Layout;
