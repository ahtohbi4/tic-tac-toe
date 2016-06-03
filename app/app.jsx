'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const Matrix = require('../lib/matrix/');

const App = React.createClass({
    getInitialState() {
        return {
            matrix: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            chainsLengthForVictory: 3
        };
    },

    _newGame() {
        this.setState({
            matrix: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            chainsLengthForVictory: 2
        });
    },

    render() {
        return <div className="app">
            <h1></h1>

            <Game matrix={this.state.matrix} chainsLengthForVictory={this.state.chainsLengthForVictory}/>

            <PopupContainer/>
        </div>;
    }
});

const PopupContainer = React.createClass({
    getDefaultProps() {
        return {
            popups: []
        };
    },

    render() {
        if (this.props.popups.length) {
            return <div className="popup-container">{this.props.popups.map((popup) => {
                return 'dddd';
            })}</div>;
        } else {
            return false;
        }
    }
});

/**
 * @class Game
 */
const Game = React.createClass({
    getDefaultProps() {
        return {
            matrix: [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            chainsLengthForVictory: 3
        };
    },

    getInitialState() {
        return {
            history: {
                index: 0,
                winsCount: 0,
                lossesCount: 0
            },
            matrix: this.props.matrix,
            chainsLengthForVictory: this.props.chainsLengthForVictory,
            player: 'man'
        };
    },

    _playerValue() {
        return {
            'man': 1,
            'pc': -1
        }[this.state.player];
    },

    _move(x, y) {
        return () => {
            let matrix = this.state.matrix;

            if (matrix[y][x] === 0) {
                matrix[y][x] = this._playerValue();

                this.setState({
                    matrix: matrix
                });
            }

            if (/** Check a winner */ this._hasWinner()) {
                // Congratulate
                console.log('Winner!');
                this._reset();
            } else if (/** Check available to move cells */ true) {
                // Continue
                this._changePlayer();
            } else {
                // Dead heat
            }
        };
    },

    /**
     * @returns {array}
     * @privet
     */
    _getLines() {
        let result;
        const matrix = new Matrix(this.props.matrix);

        result = [].concat(matrix.getRows(), matrix.getColumns(), matrix.getDiagonalsMaj(), matrix.getDiagonalsMin());
        result = result.filter((line) => {
            return (line.length >= this.props.chainsLengthForVictory);
        });

        return result;
    },

    /**
     * @returns {boolean}
     * @privet
     */
    _hasWinner() {
        return this._getLines().some((line) => {
            let chain;

            return line.some((value, i) => {
                if (i !== 0 && line[i - 1] === value) {
                    chain += value; // debugger;

                    if (Math.abs(chain) === this.state.chainsLengthForVictory) {
                        return true;
                    }
                } else {
                    chain = value;
                }
            });
        });
    },

    _changePlayer() {
        let player = (this.state.player === 'man') ? 'pc' : 'man';

        this.setState({
            player: player
        });
    },

    _reset() {
    },

    render() {
        return (
            <div className="game">
                <Score winsCount={this.state.history.winsCount} lossesCount={this.state.history.lossesCount}/>

                <Board>
                    {this.state.matrix.map((row, y) => {
                        return (
                            <BoardRow key={y}>
                                {row.map((v, x) => {
                                    let value = this.state.matrix[y][x];
                                    // let action = (this.state.player === 'man') ? this._move(x, y) : false;
                                    let action = (value === 0) ? this._move(x, y) : false;

                                    return <BoardCell key={x} value={value} onClick={action}/>;
                                })}
                            </BoardRow>
                        );
                    })}
                </Board>

                <Player value={this.state.player}/>
            </div>
        );
    }
});

/**
 * @class Board
 */
const Board = React.createClass({
    render() {
        return <div className="board">{this.props.children}</div>;
    }
});

/**
 * @class BoardRow
 */
const BoardRow = React.createClass({
    render() {
        return <div className="board__row">{this.props.children}</div>;
    }
});

/**
 * @class BoardCell
 */
const BoardCell = React.createClass({
    /**
     * @param [mods]
     * @param [mods.value='']
     */
    getInitialState() {
        return {
            mods: {
                value: ''
            }
        };
    },

    componentWillReceiveProps(nextProps) {
        const valueAliases = {
            '-1': 'o',
            1: 'x'
        };

        if (valueAliases.hasOwnProperty(nextProps.value)) {
            this.setState({
                mods: {
                    value: `board__cell_value_${valueAliases[nextProps.value]}`
                }
            });
        }
    },

    render() {
        let className = `board__cell ${this.state.mods.value}`.trim();

        return <div className={className} onClick={this.props.onClick}></div>;
    }
});

/**
 * @class Player
 */
const Player = React.createClass({
    render() {
        return <div className="player">{this.props.value}</div>;
    }
});

/**
 * @class Score
 * @property {number} winsCount
 * @property {number} lossesCount
 */
const Score = React.createClass({
    render() {
        return <div className="score">{this.props.winsCount}:{this.props.lossesCount}</div>;
    }
});

ReactDOM.render(<App/>, document.querySelector('.app'));
