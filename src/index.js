// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux'
import store from './redux'

// Router
import { BrowserRouter as Router } from 'react-router-dom'

// Components
import App from './App';

// Style
import './index.css'


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);