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
            game: {
                index: 0,
                winsCount: 0,
                lossesCount: 0
            }
        };
    },

    render() {
        return (
            <div className="game">
                <h1 className="text__h1">Tic-Tac-Toe</h1>

                <Score winsCount={this.state.game.winsCount} lossesCount={this.state.game.lossesCount}/>

                <Board/>
            </div>
        );
    }
});

/**
 * @class Board
 */
const Board = React.createClass({
    getInitialState() {
        return {
            matrix: MATRIX
        };
    },

    _toMove({x, y}) {
        return () => {
            console.log(`Click on ${x}:${y}.`);
        };
    },

    render() {
        return (
            <div className="board">
                {this.state.matrix.map((row, y) => {
                    return (
                        <BoardRow key={y}>
                            {row.map((cell, x) => {
                                return <BoardCell key={x} x={x} y={y} onClick={this._toMove({
                                    x: x,
                                    y: y
                                })}/>;
                            })}
                        </BoardRow>
                    );
                })}
            </div>
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
    render() {
        return <div className="board__cell"></div>;
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
