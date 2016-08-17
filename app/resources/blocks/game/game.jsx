import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Matrix from 'matrix-slicer';

import {changePlayer, setMatrixValue} from '../../../actions/';

import Board from '../board/board';

/**
 * @class
 * @extends Component
 *
 * @props {array} matrix
 */
class Game extends Component {
    constructor() {
        super();

        this.makeAMove = this.makeAMove.bind(this);
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
            console.log('We have a winner!');
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
            <div className="game">
                <Board matrix={this.props.game.matrix} makeAMove={this.makeAMove}/>
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
            setMatrixValue: bindActionCreators(setMatrixValue, dispatch)
        };
    }
)(Game);
