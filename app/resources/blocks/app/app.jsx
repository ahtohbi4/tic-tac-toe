import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import classnames from 'classnames';

import {resetMatrix, resetWinner} from '../../../actions/';

import Game from '../game/game';
import Score from '../score/score';
import Settings, {SettingsControl} from '../settings/settings';

/**
 * @class
 * @extends Component
 */
class App extends Component {
    constructor() {
        super();

        this.startNewGame = this.startNewGame.bind(this);
    }

    startNewGame() {
        this.props.resetMatrix();
        this.props.resetWinner();
    }

    render() {
        return (
            <div className={classnames('app', {
                'app_with-popup': this.props.isActivePopup
            })}>
                <div className="app__content">
                    <SettingsControl/>

                    <h1 className="app__title">Tic-Tac-Toe</h1>

                    <Score/>

                    <Game/>
                </div>

                {this.props.isActivePopup ? <Settings onSubmit={this.startNewGame}/> : null}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            isActivePopup: state.isActivePopup,
            game: state.game
        };
    },
    (dispatch) => {
        return {
            resetMatrix: bindActionCreators(resetMatrix, dispatch),
            resetWinner: bindActionCreators(resetWinner, dispatch)
        };
    }
)(App);
