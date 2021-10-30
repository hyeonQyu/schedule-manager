import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Portals from '@components/portals/Portals';

ReactDOM.render(
    <BrowserRouter>
        <App />
        <Portals />
    </BrowserRouter>,
    document.getElementById('root'),
);
