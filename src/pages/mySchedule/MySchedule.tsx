import React from 'react';
import { observer } from 'mobx-react';
import Layout from '@components/layout/Layout';
import { RouteComponentProps } from 'react-router-dom';

const MySchedule = observer((props: RouteComponentProps) => {
    return <Layout {...props} />;
});

export default MySchedule;
