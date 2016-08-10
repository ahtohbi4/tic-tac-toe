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
    constructor() {
        super();

        this.state = {
            clickable: true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.state.clickable) {
            this.props.setMatrixValue(this.props.x, this.props.y, 1);

            this.setState({
                clickable: false
            });
        }
    }

    render() {
        let className = classnames('board__cell', {
            board__cell_clickable: this.state.clickable
        });

        return <div className={className} onClick={this.handleClick}></div>
    }
}

function mapStateToProps(state) {
    return {
        game: state.game
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setMatrixValue: (x, y, value) => {
            dispatch({
                type: 'SET_MATRIX_VALUE',
                x,
                y,
                value
            });
        }
    }
}

export let BoardCellConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardCell);
