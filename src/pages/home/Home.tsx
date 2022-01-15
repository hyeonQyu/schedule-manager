import React from 'react';
import { observer } from 'mobx-react';
import Layout from '@components/layout/Layout';
import ScheduleCalendar from '@components/schedule-calendar/ScheduleCalendar';
import DateDetailMenu from '@components/date-detail-menu/DateDetailMenu';

const Home = observer(() => {
    return (
        <Layout>
            <ScheduleCalendar />
            <DateDetailMenu />
        </Layout>
    );
});

export default Home;
