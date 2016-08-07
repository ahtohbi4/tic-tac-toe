import React, {Component} from 'react';
import Matrix from 'matrix-slicer';

import Board from '../board/board';

/**
 * @class
 * @extends Component
 *
 * @props [array] [matrix=[[0, 0, 0], [0, 0, 0], [0, 0, 0]]]
 */
export default class Game extends Component {
    render() {
        return <div className="game">
            <Board matrix={this.props.matrix}/>
        </div>;
    }
}

/**
 * @static
 */
Game.defaultProps = {
    matrix: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
};
