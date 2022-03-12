import React from 'react';
import './App.scss';
import AppRouter from '@components/app-router/AppRouter';
import ScheduleAddModal from '@components/schedule-modal/components/add/ScheduleAddModal';
import ScheduleModifyModal from '@components/schedule-modal/components/modify/ScheduleModifyModal';

const App = () => {
    return (
        <>
            <AppRouter />
            <ScheduleAddModal />
            <ScheduleModifyModal />
        </>
    );
};

export default App;
