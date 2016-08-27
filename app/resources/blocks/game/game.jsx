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
        const MATRIX = this.props.game.matrix;

        let coordinateOneStepFromLosing;
        let coordinateTwoStepsFromLosing;
        let coordinateOneStepFromWin;
        let coordinateTwoStepsFromWin;
        let coordinateCommon;
        let coefficientPositiveCommon;

        while (
            coordinateCommon === undefined ||
            MATRIX[coordinateCommon[0]][coordinateCommon[1]] !== 0
        ) {
            const x = Math.floor(Math.random() * MATRIX[0].length);
            const y = Math.floor(Math.random() * MATRIX.length);

            coordinateCommon = [x, y];
            coefficientPositiveCommon = this.getCoordinatesCoefficient(x, y)[1];
        }

        const VICTORY_CHAINS_LENGTH = this.props.game.victoryChainsLength;

        MATRIX.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value === 0) {
                    const coefficient = this.getCoordinatesCoefficient(x, y);

                    if (/* If the only one step separates PC from the losing. */
                        coordinateOneStepFromLosing === undefined &&
                        coefficient[0] === VICTORY_CHAINS_LENGTH
                    ) {
                        coordinateOneStepFromLosing = [x, y];

                    } else if (/* If two steps separate PC from the losing. */
                        coordinateTwoStepsFromLosing === undefined &&
                        coefficient[0] + 1 === VICTORY_CHAINS_LENGTH
                    ) {
                        coordinateTwoStepsFromLosing = [x, y];

                    } else if (/* If the only one step separates PC from the victory. */
                        coordinateOneStepFromWin === undefined &&
                        coefficient[1] === VICTORY_CHAINS_LENGTH
                    ) {
                        coordinateOneStepFromWin = [x, y];

                    } else if (/* If two steps separate PC from the victory. */
                        coordinateTwoStepsFromWin === undefined &&
                        coefficient[1] + 1 === VICTORY_CHAINS_LENGTH
                    ) {
                        coordinateTwoStepsFromWin = [x, y];

                    } else if (coefficient[1] > coefficientPositiveCommon) {
                        coordinateCommon = [x, y];
                        coefficientPositiveCommon = coefficient[1];
                    }
                }
            });
        });

        if (coordinateOneStepFromLosing !== undefined) {
            return coordinateOneStepFromLosing;

        } else if (coordinateOneStepFromWin !== undefined) {
            return coordinateOneStepFromWin;

        } else if (coordinateTwoStepsFromLosing !== undefined) {
            return coordinateTwoStepsFromLosing;

        } else if (coordinateTwoStepsFromWin !== undefined) {
            return coordinateTwoStepsFromWin;

        } else {
            return coordinateCommon
        }
    }

    /**
     * Calculates a coefficient of element with coordinates (x, y).
     *
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    getCoordinatesCoefficient(x, y) {
        let result = [];

        /**
         * Creates an assumed matrix by assumed value.
         *
         * @param {array} matrix - Original matrix.
         * @param {number} assumedValue - The assumed value.
         * @param {number} x - Coordinate X of assumed value.
         * @param {number} y - Coordinate Y of assumed value.
         * @returns {array} - New matrix.
         */
        function createAssumedMatrix(matrix, assumedValue, x, y) {
            return matrix.map((row, j) => {
                return row.map((value, i) => {
                    return (j === y && i === x) ? assumedValue : value;
                });
            });
        }

        /**
         * Gets an array of arrays with nearest elements with empty values or with  values opposite by sign
         * for the element with coordinate (x, y).
         *
         * @param {number} matrix
         * @param {number} x
         * @param {number} y
         * @returns {Array}
         */
        function getCoordinatesLines(matrix, x, y) {
            let result = [];
            const value = matrix[y][x];
            let i, j,
                line;

            // By row
            i = x;

            while (
                matrix[y][i - 1] !== undefined &&
                matrix[y][i - 1] !== (-1) * value
            ) {
                i--;
            }

            line = [];

            while (
                matrix[y][i + 1] !== undefined &&
                matrix[y][i + 1] !== (-1) * value
            ) {
                i++;
                line.push(matrix[y][i]);
            }

            result.push(line);

            // By column
            j = y;

            while (
                matrix[j - 1] !== undefined &&
                matrix[j - 1][x] !== (-1) * value
            ) {
                j--;
            }

            line = [];

            while (
                matrix[j + 1] !== undefined &&
                matrix[j + 1][x] !== (-1) * value
            ) {
                j++;
                line.push(matrix[j][x]);
            }

            result.push(line);

            // By major diagonal
            i = x; j = y;

            while (
                matrix[j - 1] !== undefined &&
                matrix[j - 1][i - 1] !== undefined &&
                matrix[j - 1][i - 1] !== (-1) * value
            ) {
                i--; j--;
            }

            line = [];

            while (
                matrix[j + 1] !== undefined &&
                matrix[j + 1][i + 1] !== undefined &&
                matrix[j + 1][i + 1] !== (-1) * value
            ) {
                i++; j++;
                line.push(matrix[j][i]);
            }

            result.push(line);

            // By minor diagonal
            i = x; j = y;

            while (
                matrix[j + 1] !== undefined &&
                matrix[j + 1][i - 1] !== undefined &&
                matrix[j + 1][i - 1] !== (-1) * value
            ) {
                i--; j++;
            }

            line = [];

            while (
                matrix[j - 1] !== undefined &&
                matrix[j - 1][i + 1] !== undefined &&
                matrix[j - 1][i + 1] !== (-1) * value
            ) {
                i++; j--;
                line.push(matrix[j][i]);
            }

            result.push(line);

            return result;
        }

        const coefficientOfAssume = function (matrix, x, y) {
            let coefficients = [];
            let coefficient,
                i, j;

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
        result.push(coefficientOfAssume(createAssumedMatrix(this.props.game.matrix, 1, x, y), x, y));

        // Assumption #2: value = -1 (not to lose).
        result.push(coefficientOfAssume(createAssumedMatrix(this.props.game.matrix, -1, x, y), x, y));

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
