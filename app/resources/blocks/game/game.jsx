import React, {Component} from 'react';

import './game.css';

export default class Game extends Component {
    render() {
        return <div className="{styles['game']}">
            <h1>Tic-Tac-Toe</h1>
        </div>;
    }
}
