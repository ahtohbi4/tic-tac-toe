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

    _toMove(x, y) {
        return () => {
            this._changePlayer();
        };
    },

    _calculate() {
        // vertical
        let count = 0;

        this.state.matrix.forEach((line) => {
            line.forEach((value, index) => {
                if (index > 0 && line[index - 1] === value) {
                    count =+ value;
                } else {
                    count = 0;
                }
            });
        });

        return count;
    },

    _changePlayer() {
        let player = (this.state.player === 'man') ? 'pc' : 'man';

        this.setState({
            player: player
        });
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
                                    // let action = (this.state.player === 'man') ? this._toMove(x, y) : false;
                                    let action = (value === 0) ? this._toMove(x, y) : false;

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
