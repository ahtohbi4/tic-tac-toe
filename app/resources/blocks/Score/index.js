import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.css';

/**
 * @class
 * @extends Component
 *
 * @props {number} [defeats=0]
 * @props {number} [wins=0]
 */
class Score extends Component {
    static propTypes = {
        history: PropTypes.shape({
            defeats: PropTypes.number,
            wins: PropTypes.number,
        }),
    };

    static defaultProps = {
        history: {
            defeats: 0,
            wins: 0,
        },
    };

    render() {
        const { history: { defeats, wins } } = this.props;

        return (
            <div className="score">
                <span className="score__wins">{wins}</span>
                <span className="score__delimiter">:</span>
                <span className="score__defeats">{defeats}</span>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        history: state.history,
    }),
)(Score);
