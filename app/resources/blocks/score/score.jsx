import React, {Component} from 'react';
import {connect} from 'react-redux';

import './score.css';

/**
 * @class
 * @extends Component
 *
 * @props {number} [defeats=0]
 * @props {number} [wins=0]
 */
class Score extends Component {
    /**
     * @static
     */
    static propTypes = {
        defeats: React.PropTypes.number,
        wins: React.PropTypes.number
    }

    /**
     * @static
     */
    static defaultProps = {
        defeats: 0,
        wins: 0
    }

    render() {
        return (
            <div className="score">
                <span className="score__wins">{this.props.history.wins}</span>
                <span className="score__delimiter">:</span>
                <span className="score__defeats">{this.props.history.defeats}</span>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            history: state.history
        };
    }
)(Score);
