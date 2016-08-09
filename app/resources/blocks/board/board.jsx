import React, {Component} from 'react';
import {connect} from 'react-redux';

import classnames from 'classnames';

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
                        return <BoardCellConnect key={x} x={x} y={y}/>
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
 *
 * @props {number} x
 * @props {number} y
 */
class BoardCell extends Component {
    state = {
        clickable: (this.props.game.matrix[this.props.y][this.props.x] === 0 ? true : false)
    }

    _getMove() {
        console.log('Get move!');
    }

    render() {
        let className = classnames('board__cell', {
            board__cell_clickable: this.state.clickable
        });

        return <div className={className} onClick={this._getMove}></div>
    }
}

export let BoardCellConnect = connect(
    (state) => {
        return {
            game: state.game
        };
    }
)(BoardCell);
