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
            game: {
                matrix: MATRIX
            }
        };
    },

    _toMove() {
        alert(`Click!`);
    },

    render() {
        return (
            <div className="game">
                <Score winsCount={this.state.history.winsCount} lossesCount={this.state.history.lossesCount}/>

                <Board>
                    {this.state.game.matrix.map((row, y) => {
                        return (
                            <BoardRow key={y}>
                                {row.map((value, x) => {
                                    return <BoardCell key={x} value={value} onClick={this._toMove}/>;
                                })}
                            </BoardRow>
                        );
                    })}
                </Board>
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
            value: this.props.value || 0
        };
    },

    _setValue() {
        if (this.props.setValue) {
            this.props.setValue('Message from child');
        }
    },

    render() {
        return <div className="board__cell" onClick={this._setValue}></div>;
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
