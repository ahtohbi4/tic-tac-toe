import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from '../../reducers';
/* eslint-disable no-undef, no-underscore-dangle */
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-disable */

import App from '../blocks/App';

import './index.html';

/**
 * @class
 * @extends Component
 */
class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

render(
    <Root />,
    document.getElementById('root'),
);
