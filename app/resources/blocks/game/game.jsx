import React, {Component} from 'react';
import {connect} from 'react-redux';

import Matrix from 'matrix-slicer';

import Board from '../board/board';

/**
 * @class
 * @extends Component
 *
 * @props {array} matrix
 */
class Game extends Component {
    render() {
        return (
            <div className="game">
                <Board matrix={this.props.game.matrix}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        game: state.game
    };
}

export default connect(
    mapStateToProps
)(Game);
