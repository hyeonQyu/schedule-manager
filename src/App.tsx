import React, { useEffect } from 'react';
import './App.scss';
import { loading } from '@components/common/loading/Loading';
import { authService } from './firebaseService.js';

const App = () => {
    loading.show();

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            console.log(user);
            loading.hide();
        });
    });
    return <div></div>;
};

export default App;
