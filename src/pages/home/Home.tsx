import React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import Layout from '@components/layout/Layout';
import ScheduleCalendar from '@components/common/schedule-calendar/ScheduleCalendar';

const Home = observer((props: RouteComponentProps) => {
    return (
        <Layout {...props}>
            <ScheduleCalendar />
        </Layout>
    );
});

export default Home;
