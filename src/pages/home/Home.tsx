import React from 'react';
import { observer } from 'mobx-react';
import Layout from '@components/layout/Layout';
import ScheduleCalendar from '@components/common/schedule-calendar/ScheduleCalendar';

const Home = observer(() => {
    return (
        <Layout>
            <ScheduleCalendar />
        </Layout>
    );
});

export default Home;
