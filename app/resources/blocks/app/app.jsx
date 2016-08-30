import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import classnames from 'classnames';

import * as actions from '../../../actions/';

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
        this.props.actions.resetMatrix();
        this.props.actions.resetPlayer();

        if (this.props.game.hasAWinner) {
            if (this.props.game.player === -1) {
                this.props.actions.increaseCounterOfWins();
            } else {
                this.props.actions.increaseCounterOfDefeats();
            }

            this.props.actions.resetWinner();
        }

        this.props.actions.gameStart();
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

                    {!this.props.game.isGoing ? (
                        <div>
                            {this.props.game.hasAWinner ? (
                                <p>{(this.props.game.player === -1) ? 'You are the Winner!' : 'PC is the Winner!'}</p>
                            ) : (
                                <p>There are on a Winner. Try again!</p>
                            )}
                            <button onClick={this.startNewGame}>New Game</button>
                        </div>
                    ) : null}

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
            actions: bindActionCreators(actions, dispatch)
        };
    }
)(App);
