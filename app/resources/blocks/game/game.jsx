import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Matrix from 'matrix-slicer';

import {changePlayer, setAWinner, setMatrixValue} from '../../../actions/';

import Board, {BoardCell, BoardRow} from '../board/board';

/**
 * @class
 * @extends Component
 *
 * @props {array} matrix
 */
class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            player: props.game.player
        };

        this.cpuMove = this.cpuMove.bind(this);
        this.makeAMove = this.makeAMove.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            player: newProps.game.player
        });
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.player === -1) {
            setTimeout(this.cpuMove, 1000);
        }
    }

    cpuMove() {
        this.makeClick(2, 2);
    }

    /**
     * Makes a click.
     *
     * @param {number} x - Zero-based coordinate.
     * @param {number} y - Zero-based coordinate.
     */
    makeClick(x, y) {
        document.querySelector(`.board__row:nth-child(${(y + 1)}) .board__cell:nth-child(${(x + 1)})`).click();
    }

    /**
     * Make a move.
     *
     * @param {number} x
     * @param {number} y
     */
    makeAMove(x, y) {
        this.props.setMatrixValue(x, y, this.props.game.player);

        if (this.hasAWinner) {
            this.props.setAWinner(true);
        }

        this.props.changePlayer();
    }

    /**
     * Getter of columns, rows and diagonals of the game matrix.
     *
     * @returns {array}
     */
    get lines() {
        let result;
        const matrix = new Matrix(this.props.game.matrix);

        result = [].concat(matrix.getRows(), matrix.getColumns(), matrix.getDiagonalsMaj(), matrix.getDiagonalsMin());
        result = result.filter((line) => {
            return (line.length >= this.props.game.victoryChainsLength);
        });

        return result;
    }

    /**
     * Getter of the winner flag.
     *
     * @returns {boolean} True if there is a winner of the Game.
     */
    get hasAWinner() {
        return this.lines.some((line) => {
            let chain;

            return line.some((value, i) => {
                if (i !== 0 && line[i - 1] === value) {
                    chain += value;

                    if (Math.abs(chain) === this.props.game.victoryChainsLength) {
                        return true;
                    }
                } else {
                    chain = value;
                }
            });
        });
    }

    render() {
        return (
            <div className="game">{this.props.game.hasAWinner ? 'Yep! We have a Winner!' : null}
                <Board>
                    {this.props.game.matrix.map((row, y) => {
                        return <BoardRow key={y}>
                            {row.map((value, x) => {
                                return <BoardCell key={x} x={x} y={y} isClickable={(value === 0)} type={value} onClick={this.makeAMove}/>;
                            })}
                        </BoardRow>;
                    })}
                </Board>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            game: state.game
        };
    },
    (dispatch) => {
        return {
            changePlayer: bindActionCreators(changePlayer, dispatch),
            setAWinner: bindActionCreators(setAWinner, dispatch),
            setMatrixValue: bindActionCreators(setMatrixValue, dispatch)
        };
    }
)(Game);
