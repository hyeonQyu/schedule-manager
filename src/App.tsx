import React from 'react';
import './App.scss';
import AppRouter from '@components/app-router/AppRouter';
import ScheduleAddModal from '@components/schedule-modal/components/add/ScheduleAddModal';

const App = () => {
    return (
        <>
            <AppRouter />
            <ScheduleAddModal />
        </>
    );
};

export default App;
