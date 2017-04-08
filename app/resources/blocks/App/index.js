import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

import * as actions from '../../../actions/';

import Button from '../Button';
import Game from '../Game';
import Header from '../Header';
import Score from '../Score';
import Settings from '../Settings';

import './styles.css';
import '../Text/styles.css';

/**
 * @class
 * @extends Component
 */
export class App extends Component {
    static propTypes = {
        game: PropTypes.shape({
            player: PropTypes.number.isRequired,
            hasAWinner: PropTypes.bool,
            isGoing: PropTypes.bool,
        }),
        isActivePopup: PropTypes.bool,

        gameStart: PropTypes.func.isRequired,
        increaseCounterOfDefeats: PropTypes.func.isRequired,
        increaseCounterOfWins: PropTypes.func.isRequired,
        resetMatrix: PropTypes.func.isRequired,
        resetPlayer: PropTypes.func.isRequired,
        resetWinner: PropTypes.func.isRequired,
    };

    static defaultProps = {
        game: {
            hasAWinner: false,
            isGoing: false,
        },
        isActivePopup: false,
    };

    constructor() {
        super();

        this.startNewGame = this.startNewGame.bind(this);
    }

    startNewGame() {
        const {
            game: {
                hasAWinner,
                player,
            },

            gameStart,
            increaseCounterOfDefeats,
            increaseCounterOfWins,
            resetMatrix,
            resetPlayer,
            resetWinner,
        } = this.props;

        resetMatrix();
        resetPlayer();

        if (hasAWinner) {
            if (player === -1) {
                increaseCounterOfWins();
            } else {
                increaseCounterOfDefeats();
            }

            resetWinner();
        }

        gameStart();
    }

    render() {
        return (
            <div
                className={classnames(
                    'app',
                    {
                        'app_with-popup': this.props.isActivePopup,
                    },
                )}
            >
                <div className="app__content">
                    <Header />

                    <Score />

                    {!this.props.game.isGoing ? (
                        <div className="app__message">
                            <div className="app__message-content">
                                {this.props.game.hasAWinner ? (
                                    <p>
                                        {(this.props.game.player === -1) ? 'You are the Winner!' : 'PC is the Winner!'}
                                    </p>
                                ) : (
                                    <p>There are on a Winner. Try again!</p>
                                )}

                                <Button onClick={this.startNewGame}>New Game</Button>
                            </div>
                        </div>
                    ) : null}

                    <Game />
                </div>

                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="popup__action"
                    transitionEnterTimeout={250}
                    transitionLeaveTimeout={250}
                >
                    {this.props.isActivePopup ? (
                        <Settings startNewGame={this.startNewGame} />
                    ) : null}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        isActivePopup: state.isActivePopup,
        game: state.game,
    }),
    (dispatch) => ({
        ...bindActionCreators(actions, dispatch),
    }),
)(App);
