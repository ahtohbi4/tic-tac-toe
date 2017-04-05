import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import './button.css';

/**
 * @class
 * @extends Component
 */
export default class Button extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ]),
        className: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        name: React.PropTypes.string,
        type: React.PropTypes.oneOf([
            'button',
            'reset',
            'submit',
        ]),

        onClick: PropTypes.func.isRequired,
    }

    static defaultProps = {
        children: null,
        className: null,
        disabled: false,
        name: null,
        type: 'button',
    }

    render() {
        return (
            <button
                className={classnames(
                    'button',
                    this.props.className,
                )}
                disabled={this.props.disabled}
                name={this.props.name}
                type={this.props.type}

                onClick={this.props.onClick}
            >
                {this.props.children}
            </button>
        );
    }
}
