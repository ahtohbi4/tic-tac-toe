import React, { Component, PropTypes } from 'react';

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
