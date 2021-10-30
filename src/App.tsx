import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Login from '@pages/login/Login';
import ProtectedRoute from '@components/protected-route/ProtectedRoute';
import Home from '@pages/home/Home';

const App = () => {
    return (
        <Switch>
            <ProtectedRoute exact path={'/'} component={Home} />
            <Route exact path={'/login'} component={Login} />
        </Switch>
    );
};

export default App;
