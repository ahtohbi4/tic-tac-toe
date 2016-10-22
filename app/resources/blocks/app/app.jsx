import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import classnames from 'classnames';

import * as actions from '../../../actions/';

import Button from '../button/button';
import Game from '../game/game';
import Header from '../header/header';
import Score from '../score/score';
import Settings from '../settings/settings';

import './app.css';
import '../text/text.css';

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
                    <Header/>

                    <Score/>

                    {!this.props.game.isGoing ? (
                        <div className="app__message">
                            <div className="app__message-content">
                                {this.props.game.hasAWinner ? (
                                    <p>{(this.props.game.player === -1) ? 'You are the Winner!' : 'PC is the Winner!'}</p>
                                ) : (
                                    <p>There are on a Winner. Try again!</p>
                                )}

                                <Button onClick={this.startNewGame}>New Game</Button>
                            </div>
                        </div>
                    ) : null}

                    <Game/>
                </div>

                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="popup__action"
                    transitionEnterTimeout={250}
                    transitionLeaveTimeout={250}>
                    {this.props.isActivePopup ? <Settings key={0} startNewGame={this.startNewGame}/> : null}
                </ReactCSSTransitionGroup>
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
