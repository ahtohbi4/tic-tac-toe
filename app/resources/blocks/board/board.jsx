import React, {Component} from 'react';
import {connect} from 'react-redux';

import classnames from 'classnames';

import './board.css';

/**
 * @class
 * @extends Component
 */
export default class Board extends Component {
    render() {
        return (
            <div className="board">{this.props.children}</div>
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
 * @props {number} isClickable
 * @props {number} type - Type of cell. Possible values is -1 or 1.
 */
class BoardCellBlank extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isClickable: props.isClickable
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            isClickable: nextProps.isClickable,
            type: nextProps.type
        });
    }

    get type() {
        const TYPES = {
            '-1': 'board__cell_type_o',
            1: 'board__cell_type_x'
        };

        return TYPES[this.state.type] || undefined;
    }

    handleClick() {
        if (this.state.isClickable) {
            const {x, y} = this.props;

            this.props.onClick(x, y);
        }
    }

    render() {
        return (
            <div className={classnames(
                'board__cell', {
                board__cell_clickable: this.state.isClickable,
                [this.type]: this.type
            })} onClick={this.handleClick}>
                <div className="board__cell-spacer"></div>
            </div>
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
