import React, {Component} from 'react';

/**
 * @class
 * @extends Component
 *
 * @props {number} [defeats=0]
 * @props {number} [wins=0]
 */
export default class Score extends Component {
    render() {
        return <div className="score">
            <span className="score__wins">{this.props.wins}</span>
            <span className="score__delimiter">:</span>
            <span className="score__defeats">{this.props.defeats}</span>
        </div>;
    }
}

/**
 * @static
 */
Score.propTypes = {
    defeats: React.PropTypes.number,
    wins: React.PropTypes.number
};

/**
 * @static
 */
Score.defaultProps = {
    defeats: 0,
    wins: 0
};
