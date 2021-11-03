import React from 'react';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import UserStore from '@stores/UserStore';
import Login from '@pages/login/Login';
import Home from '@pages/home/Home';

const userStore = UserStore.instance;

const AppRouter = observer(() => {
    const { isLoggedIn } = userStore;
    return <Switch>{isLoggedIn ? <Route exact path={'/'} component={Home} /> : <Route exact path={'/'} component={Login} />}</Switch>;
});

export default AppRouter;
