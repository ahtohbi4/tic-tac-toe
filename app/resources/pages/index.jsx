import React, {Component} from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import DevTools from '../../utils/DevTools';

import reducers from '../../reducers';
const store = createStore(reducers, DevTools.instrument());

import App from '../blocks/app/app';

import './index.html';
import './index.css';

/**
 * @class
 * @extends Component
 */
class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <App/>
                    <DevTools/>
                </div>
            </Provider>
        );
    }
}

render(
    <Root/>,
    document.getElementById('root')
);
