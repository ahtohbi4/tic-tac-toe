'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const MATRIX = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

/**
 * @class App
 */
const App = React.createClass({
    getInitialState () {
        return {
            game: {
                index: 0,
                countWins: 0,
                countLosses: 0
            }
        };
    },

    render () {
        return (
            <div className="game">
                <Score winsCount={this.state.winsCount} lossesCount={this.state.lossesCount}/>
                <NewGameButton/>
                <Board/>
            </div>
        );
    }
});

const Button = React.createClass({
    render () {
        return <button className="button {this.props.className || ''}" type="button">{this.props.text}</button>
    }
});

const NewGameButton = React.createClass({
    render () {
        return <Button text="Foo"/>
    }
});

/**
 * @class Board
 */
const Board = React.createClass({
    getInitialState () {
        return {
            matrix: MATRIX
        };
    },

    render () {
        return (
            <div className="board">
                {
                    this.state.matrix.map(function (row, index) {
                        return <BoardRow key={index} y={index} cells={row}/>;
                    })
                }
            </div>
        );
    }
});

/**
 * @class BoardRow
 */
const BoardRow = React.createClass({
    render () {
        let y = this.props.y;

        return <div className="board__row">{this.props.cells.map(function (cell, index) {
            return <BoardCell key={index} x={index} y={y}/>;
        })}</div>;
    }
});

/**
 * @class BoardCell
 */
const BoardCell = React.createClass({
    getMove () {
        alert(`x=${this.props.x}, y=${this.props.y}`);
    },

    render () {
        return <div className="board__cell" onClick={this.getMove}/>;
    }
});

/**
 * @class Score
 * @property {number} winsCount
 * @property {number} lossesCount
 */
const Score = React.createClass({
    render () {
        return <div className="score">{this.props.winsCount}:{this.props.lossesCount}</div>
    }
});

ReactDOM.render(
    <Game/>,
    document.querySelector('.app')
);
