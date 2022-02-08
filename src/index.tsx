import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import Portals from '@components/common/portals/Portals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';

ReactDOM.render(
    <HashRouter>
        <App />
        <Portals />
    </HashRouter>,
    document.getElementById('root'),
);
serviceWorkerRegistration.register();
