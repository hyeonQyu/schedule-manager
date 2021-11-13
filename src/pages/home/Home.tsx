import React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import Layout from '@components/layout/Layout';

const Home = observer((props: RouteComponentProps) => {
    return (
        <div>
            <Layout {...props} />
        </div>
    );
});

export default Home;
