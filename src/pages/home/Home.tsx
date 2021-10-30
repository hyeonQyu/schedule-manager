import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Home.scss';
import { RouteProps } from 'react-router-dom';

const cx = classNames.bind(style);

const Home = observer((props: RouteProps) => {
    return <div>홈</div>;
});

export default Home;
