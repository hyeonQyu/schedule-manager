import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Login.scss';
import { RouteComponentProps } from 'react-router-dom';
import GoogleIcon from '@icons/google/GoogleIcon';
import UserStore from '@stores/UserStore';

const cx = classNames.bind(style);

const userStore = UserStore.instance;

const Login = observer((props: RouteComponentProps) => {
    const { continueWithGoogle, isLoggedIn } = userStore;

    if (isLoggedIn) props.history.push('/');

    return (
        <div className={cx('wrapper')}>
            <button onClick={continueWithGoogle}>
                <div className={cx('icon_google')}>
                    <GoogleIcon />
                </div>
                <span>구글 계정으로 계속하기</span>
            </button>
        </div>
    );
});

export default Login;
