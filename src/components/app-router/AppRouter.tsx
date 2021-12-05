import React from 'react';
import { observer } from 'mobx-react';
import { Routes, Route } from 'react-router-dom';
import UserStore from '@stores/UserStore';
import Login from '@pages/login/Login';
import Home from '@pages/home/Home';
import ProtectedRoute from '@components/protected-route/ProtectedRoute';
import MySchedule from '@pages/mySchedule/MySchedule';
import OtherSchedule from '@pages/otherSchedule/OtherSchedule';

const userStore = UserStore.instance;

const AppRouter = observer(() => {
    const { isLoggedIn } = userStore;

    return (
        <Routes>
            <Route path={'/'} element={isLoggedIn ? <Home /> : <Login />} />
            <Route
                path={'/my'}
                element={
                    <ProtectedRoute>
                        <MySchedule />
                    </ProtectedRoute>
                }
            />
            <Route
                path={'/other'}
                element={
                    <ProtectedRoute>
                        <OtherSchedule />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
});

export default AppRouter;
