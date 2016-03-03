'use strict';

let React = require('react');
let ReactDOM = require('react-dom');

let MATRIX = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

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
                    this.state.matrix.map(function (row) {
                        return row.map(function () {
                            return <Cell/>;
                        });
                    })
                }
            </div>
        );
    }
});

let Cell = React.createClass({
    render: function () {
        return <div className="board__cell"/>;
    }
});

let Score = React.createClass({
    render: function () {
        return <div className="score">{this.props.winsCount}:{this.props.lossesCount}</div>
    }
});

ReactDOM.render(
    <Game/>,
    document.querySelector('.app')
);
