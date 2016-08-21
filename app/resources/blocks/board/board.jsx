import React, {Component} from 'react';
import {connect} from 'react-redux';

import classnames from 'classnames';

/**
 * @class
 * @extends Component
 */
export default class Board extends Component {
    render() {
        return (
            <div className="board">
                {this.props.matrix.map((row, y) => {
                    return <BoardRow key={y}>
                        {row.map((cell, x) => {
                            return <BoardCell key={x} x={x} y={y} makeAMove={this.props.makeAMove}/>
                        })}
                    </BoardRow>;
                })}
            </div>
        );
    }
};

/**
 * @class
 * @extends Component
 */
export class BoardRow extends Component {
    render() {
        return (
            <div className="board__row">{this.props.children}</div>
        );
    }
};

/**
 * @class
 * @extends Component
 *
 * @props {number} x
 * @props {number} y
 */
class BoardCellBlank extends Component {
    constructor() {
        super();

        this.state = {
            clickable: true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.state.clickable) {
            const {x, y} = this.props;

            this.props.makeAMove(x, y);

            this.setState({
                ...this.state,
                clickable: false,
                type: this.props.game.player
            });
        }
    }

    render() {
        return (
            <div className={classnames('board__cell', {
                board__cell_clickable: this.state.clickable,
                board__cell_type_x: (this.state.type === 1),
                board__cell_type_o: (this.state.type === -1)
            })} onClick={this.handleClick}></div>
        );
    }
}

export const BoardCell = connect(
    (state) => {
        return {
            game: state.game
        };
    }
)(BoardCellBlank);
