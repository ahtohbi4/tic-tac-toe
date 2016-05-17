'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const MATRIX = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

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
            matrix: MATRIX,
            player: 'man'
        };
    },

    _toMove(event) {
        let cell = event.target;

        // alert(cell.className);

        this._changePlayer();
    },

    _changePlayer() {
        let player;

        switch (this.state.player) {
            case 'man':
                player = 'pc';
                break;
            case 'pc':
                player = 'man';
                break;
            default:
                player = this.state.player;
                break;
        }

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
                                    let action = (this.state.player === 'man') ? this._toMove : null;

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
        return (
            <div className="board">{this.props.children}</div>
        );
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
     * @param [value=0]
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
            -1: 'o',
            1: 'x'
        };

        if (valueAliases.hasOwnProperty(nextProps.value)) {
            this.setState({
                mods: {
                    value: `board__cell_value_${valueAliases(nextProps.value)}`
                }
            });
        }
    },

    render() {
        return <div className={`board__cell ${this.state.mods.value}`.trim()} onClick={this.props.onClick}></div>;
    }
});

const Player = React.createClass({
    render() {
        return <div>{this.props.value}</div>;
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
