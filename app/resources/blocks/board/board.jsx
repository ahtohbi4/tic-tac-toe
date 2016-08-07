import React, {Component} from 'react';

/**
 * @class
 * @extends Component
 */
export default class Board extends Component {
    render() {
        return <div className="board">
            {this.props.matrix.map((row, y) => {
                return <BoardRow key={y}>
                    {row.map((cell, x) => {
                        return <BoardCell key={x}/>
                    })}
                </BoardRow>;
            })}
        </div>;
    }
}

/**
 * @class
 * @extends Component
 */
export class BoardRow extends Component {
    render() {
        return <div className="board__row">{this.props.children}</div>
    }
}

/**
 * @class
 * @extends Component
 */
export class BoardCell extends Component {
    render() {
        return <div className="board__cell"></div>
    }
}
