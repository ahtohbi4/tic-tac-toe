import React, {Component} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../../../reducers/index';

let store = createStore(reducers);

import Game from '../game/game';
import Score from '../score/score';
import SettingsControl from '../settings/settings__control';

/**
 * @class
 * @extends Component
 */
export default class App extends Component {
    render() {
        return <Provider store={store}>
            <div className="app">
                <SettingsControl/>

                <h1 className="app__title">Tic-Tac-Toe</h1>

                <Score/>

                <Game/>
            </div>
        </Provider>;
    }
}
