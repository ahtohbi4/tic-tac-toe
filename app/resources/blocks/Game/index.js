import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shortid from 'shortid';
import Matrix from 'matrix-slicer';

import * as actions from '../../../actions/';

import Board from '../Board';
import BoardCell from '../Board/BoardCell';
import BoardRow from '../Board/BoardRow';

/**
 * @class
 * @extends Component
 *
 * @props {array} matrix
 */
class Game extends Component {
    static propTypes = {
        game: PropTypes.shape({
            matrix: PropTypes.array.isRequired,
            player: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            victoryChainsLength: PropTypes.number.isRequired,
            hasAWinner: PropTypes.bool,
            isGoing: PropTypes.bool,
        }),

        changePlayer: PropTypes.func.isRequired,
        gameStop: PropTypes.func.isRequired,
        setAWinner: PropTypes.func.isRequired,
        setMatrixValue: PropTypes.func.isRequired,
    };

    static defaultProps = {
        game: {
            hasAWinner: false,
            isGoing: false,
        },
    };

    /**
     * Gets an array of arrays with nearest elements with empty values or with values opposite by sign
     * for the element with coordinate (x, y).
     *
     * @param {number} matrix
     * @param {number} x
     * @param {number} y
     * @param {number} maxLength
     * @returns {Array}
     */
    static getCoordinatesLines(matrix, x, y, maxLength) {
        const coordinates = [];
        const value = matrix[y][x];
        let i;
        let j;
        let line;

        // By row
        i = x;

        while (
            matrix[y][i - 1] !== undefined &&
            matrix[y][i - 1] !== (-1) * value &&
            ((x - i) + 1) < maxLength
        ) {
            i -= 1;
        }

        line = [matrix[y][i]];

        while (
            matrix[y][i + 1] !== undefined &&
            matrix[y][i + 1] !== (-1) * value &&
            ((i + 1) - x) < maxLength
        ) {
            i += 1;
            line.push(matrix[y][i]);
        }

        coordinates.push(line);

        // By column
        j = y;

        while (
            matrix[j - 1] !== undefined &&
            matrix[j - 1][x] !== (-1) * value &&
            ((y - j) + 1) < maxLength
        ) {
            j -= 1;
        }

        line = [matrix[j][x]];

        while (
            matrix[j + 1] !== undefined &&
            matrix[j + 1][x] !== (-1) * value &&
            ((j + 1) - y) < maxLength
        ) {
            j += 1;
            line.push(matrix[j][x]);
        }

        coordinates.push(line);

        // By major diagonal
        i = x; j = y;

        while (
            matrix[j - 1] !== undefined &&
            matrix[j - 1][i - 1] !== undefined &&
            matrix[j - 1][i - 1] !== (-1) * value &&
            ((x - i) + 1) < maxLength &&
            ((y - j) + 1) < maxLength
        ) {
            i -= 1;
            j -= 1;
        }

        line = [matrix[j][i]];

        while (
            matrix[j + 1] !== undefined &&
            matrix[j + 1][i + 1] !== undefined &&
            matrix[j + 1][i + 1] !== (-1) * value &&
            ((i + 1) - x) < maxLength &&
            ((j + 1) - y) < maxLength
        ) {
            i += 1;
            j += 1;
            line.push(matrix[j][i]);
        }

        coordinates.push(line);

        // By minor diagonal
        i = x; j = y;

        while (
            matrix[j + 1] !== undefined &&
            matrix[j + 1][i - 1] !== undefined &&
            matrix[j + 1][i - 1] !== (-1) * value &&
            ((x - i) + 1) < maxLength &&
            ((j - 1) - y) < maxLength
        ) {
            i -= 1;
            j += 1;
        }

        line = [matrix[j][i]];

        while (
            matrix[j - 1] !== undefined &&
            matrix[j - 1][i + 1] !== undefined &&
            matrix[j - 1][i + 1] !== (-1) * value &&
            ((i + 1) - x) < maxLength &&
            ((y - j) + 1) < maxLength
        ) {
            i += 1;
            j -= 1;
            line.push(matrix[j][i]);
        }

        coordinates.push(line);

        return coordinates;
    }

    /**
     * Calculates the coefficient.
     *
     * @param {array} matrix
     * @param {number} x
     * @param {number} y
     * @param {number} minLength
     * @returns {number}
     */
    static calculateCoefficient(matrix, x, y, minLength) {
        const lines = Game.getCoordinatesLines(matrix, x, y, minLength);

        return lines
            .filter((line) => (line.length >= minLength))
            .reduce(
                (coefficient, line) => Math.max(coefficient, line.reduce(
                    (lineCoefficient, value) => (lineCoefficient + Math.abs(value)), 0,
                )), 0,
            );
    }

    /**
     * Creates an assumed matrix by assumed value.
     *
     * @param {array} matrix - Original matrix.
     * @param {number} assumedValue - The assumed value.
     * @param {number} x - Coordinate X of assumed value.
     * @param {number} y - Coordinate Y of assumed value.
     * @returns {array} - New matrix.
     */
    static createAssumedMatrix(matrix, assumedValue, x, y) {
        return matrix.map(
            (row, j) => row.map(
                (value, i) => ((j === y && i === x) ? assumedValue : value),
            ),
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            player: props.game.player,
        };

        this.coordinateСalculation = this.coordinateСalculation.bind(this);
        this.pcMove = this.pcMove.bind(this);
        this.makeAMove = this.makeAMove.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            player: newProps.game.player,
        });
    }

    shouldComponentUpdate(newProps, newState) {
        return (
            this.props.game.matrix !== newProps.game.matrix ||
            this.props.game.hasAWinner !== newProps.game.hasAWinner ||
            this.props.game.isGoing !== newProps.game.isGoing ||
            this.state.player !== newState.player
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.hasAWinner && !this.props.game.hasAWinner) {
            this.props.setAWinner(true);
            this.props.gameStop();
        } else if (!this.hasEmptyCells) {
            this.props.gameStop();
        } else if (this.state.player !== prevState.player && this.props.game.player === -1) {
            setTimeout(this.pcMove, 1000);
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
        const result = [];

        // Assumption #1: value = 1 (positive).
        const assumedNegativeMatrix = Game.createAssumedMatrix(this.props.game.matrix, 1, x, y);
        result.push(Game.calculateCoefficient(assumedNegativeMatrix, x, y, this.props.game.victoryChainsLength));

        // Assumption #2: value = -1 (negative).
        const assumedPositiveMatrix = Game.createAssumedMatrix(this.props.game.matrix, -1, x, y);
        result.push(Game.calculateCoefficient(assumedPositiveMatrix, x, y, this.props.game.victoryChainsLength));

        return result;
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
            MATRIX[coordinateCommon[1]][coordinateCommon[0]] !== 0
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

        if (coordinateOneStepFromWin !== undefined) {
            return coordinateOneStepFromWin;
        } else if (coordinateOneStepFromLosing !== undefined) {
            return coordinateOneStepFromLosing;
        } else if (coordinateTwoStepsFromLosing !== undefined) {
            return coordinateTwoStepsFromLosing;
        } else if (coordinateTwoStepsFromWin !== undefined) {
            return coordinateTwoStepsFromWin;
        }

        return coordinateCommon;
    }

    /**
     * PC makes a move.
     */
    pcMove() {
        const args = this.coordinateСalculation();
        args.push(this.props.game.player);

        this.props.setMatrixValue.apply(this, args);

        this.props.changePlayer();
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
        const matrix = new Matrix(this.props.game.matrix);

        return [].concat(
            matrix.getRows(),
            matrix.getColumns(),
            matrix.getDiagonalsMaj(),
            matrix.getDiagonalsMin(),
        )
        .filter((line) => (line.length >= this.props.game.victoryChainsLength));
    }

    /**
     * Determines if it has empty cells.
     *
     * @returns {boolean}
     */
    get hasEmptyCells() {
        return this.props.game.matrix.some(
            (row) => row.some(
                (value) => (value === 0),
            ),
        );
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

                return false;
            });
        });
    }

    render() {
        return (
            <div className="game">
                <Board>
                    {this.props.game.matrix.map((row, y) => (
                        <BoardRow key={shortid.generate()}>
                            {row.map((value, x) => {
                                const isClickable = (value === 0 && this.props.game.player === 1);

                                return (
                                    <BoardCell
                                        key={shortid.generate()}
                                        x={x}
                                        y={y}
                                        isClickable={isClickable}
                                        type={value}

                                        onClick={this.makeAMove}
                                    />
                                );
                            })}
                        </BoardRow>
                    ))}
                </Board>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        game: state.game,
    }),
    (dispatch) => ({
        ...bindActionCreators(actions, dispatch),
    }),
)(Game);
