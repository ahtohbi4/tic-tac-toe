import React, {Component} from 'react';

import Game from '../game/game';
import Score from '../score/score';
import SettingsControl from '../settings/settings__control';

export default class App extends Component {
    render() {
        return <div className="app">
            <SettingsControl/>

            <h1 className="app__title">Tic-Tac-Toe</h1>

            <Score/>
        </div>;
    }
}
