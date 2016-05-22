'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

/**
 * @class Game
 */
const Game = React.createClass({
    getInitialState() {
        return {
            history: {
                index: 0,
                winsCount: 0,
                lossesCount: 0
            },
            matrix: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            lineLength: 3,
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
            }

            if (/* Check a winner */ true) {
                // Congratulate
                this._reset();
            } else if (/* Check available to move cells */ true) {
                // Continue
                this._changePlayer();
            } else {
                // Dead heat
            }
        };
    },

    /**
     * @return boolean
     * @privet
     */
    _isFitInHorizontal() {
        return this.state.lineLength <= this.state.matrix[0].length;
    },

    /**
     * @return boolean
     * @privet
     */
    _isFitIntVertical() {
        return this.state.lineLength <= this.state.matrix.length;
    },

    /**
     * @return boolean
     * @privet
     */
    _isFitIntoDiagonal() {
        return this._isFitInHorizontal() && this._isFitIntVertical();
    },

    /**
     * @return boolean
     * @privet
     */
    _hasWinner() {
        let result = false;

        // By horizontal
        if (this._isFitInHorizontal()) {
            this.state.matrix.forEach((row) => {
                let chain;

                row.forEach((value, index) => {
                    if (index === 0) {
                        chain = value;
                    } else if (row[index - 1] === value) {
                        chain += value;

                        if (Math.abs(chain) === this.state.lineLength) {
                            result = true;

                            return true;
                        }
                    } else {
                        chain = 0;
                    }
                });

                if (result) {
                    return true;
                }
            });
        }

        // By vertical
        if (this._isFitIntVertical()) {
            let matrix = this.state.matrix;

            for (let i = 0; i < matrix[0].length; i++) {
                let chain;

                for (let j = 0; j < matrix.length; j++) {
                    let value = matrix[j][i];

                    if (j === 0) {
                        chain = value;
                    } else if (matrix[j - 1][i] === value) {
                        chain += value;

                        if (Math.abs(chain) === this.state.lineLength) {
                            result = true;

                            break;
                        }
                    } else {
                        chain = 0;
                    }
                }

                if (result) {
                    break;
                }
            }
        }

        // By diagonal
        if (this._isFitIntoDiagonal()) {
        }

        return result;
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

ReactDOM.render(<Game/>, document.querySelector('.app'));
