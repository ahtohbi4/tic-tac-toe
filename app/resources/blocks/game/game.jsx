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

        this.getMove = this.getMove.bind(this);
    }

    getMove(x, y) {
        this.props.setMatrixValue(x, y, this.props.game.player);

        this.props.changePlayer();
    }

    render() {
        return (
            <div className="game">
                <Board matrix={this.props.game.matrix} getMove={this.getMove}/>
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
