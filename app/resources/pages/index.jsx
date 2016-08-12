import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducers from '../../reducers';
const store = createStore(reducers);

import App from '../blocks/app/app';

import './index.html';
import './index.css';

/**
 * @class
 * @extends Component
 */
class Root extends Component {
    render() {
        return <Provider store={store}>
            <App/>
        </Provider>
    }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
