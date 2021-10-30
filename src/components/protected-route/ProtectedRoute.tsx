import React from 'react';
import { observer } from 'mobx-react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import UserStore from '@stores/UserStore';

const userStore = UserStore.instance;

const ProtectedRoute = observer((props: RouteProps) => {
    const { isLoggedIn } = userStore;

    return <Route {...props}>{!isLoggedIn ? <Redirect to={'/login'} /> : null}</Route>;
});

export default ProtectedRoute;
