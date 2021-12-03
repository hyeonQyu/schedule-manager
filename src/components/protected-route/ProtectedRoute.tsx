import React from 'react';
import { observer } from 'mobx-react';
import { Navigate } from 'react-router-dom';
import UserStore from '@stores/UserStore';

const userStore = UserStore.instance;

export interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute = observer((props: ProtectedRouteProps) => {
    const { children } = props;
    const { isLoggedIn } = userStore;

    return isLoggedIn ? children : <Navigate to={'/'} />;
});

export default ProtectedRoute;
