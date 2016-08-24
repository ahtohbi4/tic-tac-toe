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
        if (this.hasAWinner) {
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

        this.props.game.matrix.forEach((row, y, matrix) => {
            row.forEach((value, x) => {
                if (value === 0) {
                    if (result === undefined) {
                        result = [x, y];
                    } else {
                        result = [2, 2];
                    }
                }
            });
        });

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
            <div className="game">{this.props.game.hasAWinner ? 'Yep! We have a Winner!' : null}
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
