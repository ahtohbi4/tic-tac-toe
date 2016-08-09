import React, {Component} from 'react';

/**
 * @class
 * @extends Component
 *
 * @props {number} [defeats=0]
 * @props {number} [wins=0]
 */
export default class Score extends Component {
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
        return <div className="score">
            <span className="score__wins">{this.props.wins}</span>
            <span className="score__delimiter">:</span>
            <span className="score__defeats">{this.props.defeats}</span>
        </div>;
    }
}
