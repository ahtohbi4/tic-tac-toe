import React, {Component} from 'react';
import {connect} from 'react-redux';

import Game from '../game/game';
import Score from '../score/score';
import SettingsControl from '../settings/settings__control';
import Popup from '../popup/popup';

/**
 * @class
 * @extends Component
 */
class App extends Component {
    render() {
        return <div className="app">
            <div className="app__content">
                <SettingsControl/>

                <h1 className="app__title">Tic-Tac-Toe</h1>

                <Score/>

                <Game/>
                matrix = {this.props.game.matrix.map((row) => {
                    return row.join(',');
                })}
            </div>

            {this.props.isActivePopup ? <Popup/> : null}
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        isActivePopup: state.isActivePopup,
        game: state.game
    };
}

export default connect(
    mapStateToProps
)(App);
