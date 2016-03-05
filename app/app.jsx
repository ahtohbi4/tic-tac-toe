'use strict';

let React = require('react');
let ReactDOM = require('react-dom');

let MATRIX = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

/**
 * @class Game
 */
let Game = React.createClass({
    getInitialState: function () {
        return {
            index: 0,
            winsCount: 0,
            lossesCount: 0
        };
    },

    render: function () {
        return (
            <div className="game">
                <Score winsCount={this.state.winsCount} lossesCount={this.state.lossesCount}/>
                <Board/>
            </div>
        );
    }
});

/**
 * @class Board
 */
let Board = React.createClass({
    getInitialState: function () {
        return {
            matrix: MATRIX
        };
    },

    render: function () {
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
let BoardRow = React.createClass({
    render: function () {
        let y = this.props.y;

        return <div className="board__row">{this.props.cells.map(function (cell, index) {
            return <BoardCell key={index} x={index} y={y}/>;
        })}</div>;
    }
});

/**
 * @class BoardCell
 */
let BoardCell = React.createClass({
    foo : function () {
        alert(`x=${this.props.x}, y=${this.props.y}`);
    },

    render: function () {
        return <div className="board__cell" onClick={this.foo}/>;
    }
});

/**
 * @class Score
 * @property {number} winsCount
 * @property {number} lossesCount
 */
let Score = React.createClass({
    render: function () {
        return <div className="score">{this.props.winsCount}:{this.props.lossesCount}</div>
    }
});

ReactDOM.render(
    <Game/>,
    document.querySelector('.app')
);
