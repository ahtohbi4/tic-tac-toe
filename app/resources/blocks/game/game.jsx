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

        this.coordinateСalculation = this.coordinateСalculation.bind(this);
        this.pcMove = this.pcMove.bind(this);
        this.makeAMove = this.makeAMove.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            player: newProps.game.player
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.hasAWinner && !this.props.game.hasAWinner) {
            this.props.setAWinner(true);
        } else if (this.state.player !== prevState.player && this.props.game.player === -1) {
            setTimeout(this.pcMove, 1000);
        }
    }

    shouldComponentUpdate(newProps, newState) {
        return (
            this.props.game.matrix !== newProps.game.matrix ||
            this.props.game.hasAWinner !== newProps.game.hasAWinner ||
            this.state.player !== newState.player
        );
    }

    /**
     * PC makes a move.
     */
    pcMove() {
        let args = this.coordinateСalculation();
        args.push(this.props.game.player);

        this.props.setMatrixValue.apply(this, args);

        this.props.changePlayer();
    }

    /**
     * Сalculation of a coordinates for the next PC's move.
     *
     * @returns {array} - Coordinates for move in case [x, y]
     */
    coordinateСalculation() {
        let result;
        let maxCoefficient = [0, 0];

        rowsIterator: for (let j = 0; j < this.props.game.matrix.length; j++) {
            const row = this.props.game.matrix[j];

            for (let i = 0; i < row.length; i++) {
                const value = row[i];

                if (value === 0) {
                    const coefficient = this.coefficientСalculation(i, j);

                    if (result === undefined) {
                        result = [i, j];
                        maxCoefficient = coefficient;
                    }

                    if (this.props.game.victoryChainsLength === coefficient[0]) {
                        result = [i, j];

                        break rowsIterator;
                    } else if (this.props.game.victoryChainsLength === coefficient[1]) {
                        result = [i, j];

                        break rowsIterator;
                    } else if (
                        coefficient[0] > maxCoefficient[0] ||
                        coefficient[0] === maxCoefficient[0] && coefficient[1] > maxCoefficient[1]
                    ) {
                        result = [i, j];
                        maxCoefficient = coefficient;
                    }
                }
            }
        }

        return result;
    }

    /**
     * Calculates a coefficient of element with coordinates (x, y).
     *
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    coefficientСalculation(x, y) {
        let result = [];

        const assumedMatrix = (assumedValue, x, y) => {
            return this.props.game.matrix.map((row, j) => {
                return row.map((value, i) => {
                    return (j === y && i === x) ? assumedValue : value;
                });
            });
        };

        const coefficientOfAssume = function (matrix, x, y) {
            let coefficients = [];
            let coefficient,
                i,
                j;

            // In column
            j = y;

            while (matrix[j - 1] !== undefined && matrix[j - 1][x] === matrix[y][x]) {
                j--;
            }

            coefficient = 0;

            while (matrix[j] !== undefined && matrix[j][x] === matrix[y][x]) {
                coefficient++;
                j++;
            }

            coefficients.push(coefficient);

            // In row
            i = x;

            while (matrix[y][i - 1] !== undefined && matrix[y][i - 1] === matrix[y][x]) {
                i--;
            }

            coefficient = 0;

            while (matrix[y][i] !== undefined && matrix[y][i] === matrix[y][x]) {
                coefficient++;
                i++;
            }

            coefficients.push(coefficient);

            // In major diagonal
            // In minor diagonal

            return Math.max.apply(this, coefficients);
        };

        // Assumption #1: value = 1 (to win).
        result.push(coefficientOfAssume(assumedMatrix(1, x, y), x, y));

        // Assumption #2: value = -1 (not to lose).
        result.push(coefficientOfAssume(assumedMatrix(-1, x, y), x, y));

        return result;
    }

    /**
     * Human makes a move.
     *
     * @param {number} x
     * @param {number} y
     */
    makeAMove(x, y) {
        this.props.setMatrixValue(x, y, this.props.game.player);

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

        result = [].concat(
            matrix.getRows(),
            matrix.getColumns(),
            matrix.getDiagonalsMaj(),
            matrix.getDiagonalsMin()
        );
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
            <div className="game">
                <Board>
                    {this.props.game.matrix.map((row, y) => {
                        return <BoardRow key={y}>
                            {row.map((value, x) => {
                                const isClickable = (value === 0 && this.props.game.player === 1);

                                return <BoardCell key={x} x={x} y={y} isClickable={isClickable} type={value} onClick={this.makeAMove}/>;
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
