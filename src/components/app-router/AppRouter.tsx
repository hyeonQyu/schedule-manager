import React from 'react';
import { observer } from 'mobx-react';
import { Routes, Route } from 'react-router-dom';
import UserStore from '@stores/UserStore';
import Login from '@pages/login/Login';
import Home from '@pages/home/Home';
import ProtectedRoute from '@components/protected-route/ProtectedRoute';
import WeeklySchedule from '@pages/weeklySchedule/WeeklySchedule';
import Statistics from '@pages/statistics/Statistics';

const userStore = UserStore.instance;

const AppRouter = observer(() => {
    const { isLoggedIn } = userStore;

    return (
        <Routes>
            <Route path={'/'} element={isLoggedIn ? <Home /> : <Login />} />
            <Route
                path={'/weekly'}
                element={
                    <ProtectedRoute>
                        <WeeklySchedule />
                    </ProtectedRoute>
                }
            />
            <Route
                path={'/statistics'}
                element={
                    <ProtectedRoute>
                        <Statistics />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
});

export default AppRouter;
