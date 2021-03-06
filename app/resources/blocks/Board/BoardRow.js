import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @class
 * @extends Component
 */
export default class BoardRow extends Component {
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
            <div className="board__row">{this.props.children}</div>
        );
    }
}
