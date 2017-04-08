import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

/**
 * @class
 * @extends Component
 */
export default class Board extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ]),
    }

    static defaultProps = {
        children: null,
    }

    render() {
        return (
            <div className="board">{this.props.children}</div>
        );
    }
}
