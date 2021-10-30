import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import Portals from '@components/common/portals/Portals';

ReactDOM.render(
    <HashRouter>
        <App />
        <Portals />
    </HashRouter>,
    document.getElementById('root'),
);
