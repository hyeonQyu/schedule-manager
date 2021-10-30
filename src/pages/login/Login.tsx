import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Login.scss';
import { RouteProps } from 'react-router-dom';

const cx = classNames.bind(style);

const Login = observer((props: RouteProps) => {
    return <div>로그인 페이지</div>;
});

export default Login;
