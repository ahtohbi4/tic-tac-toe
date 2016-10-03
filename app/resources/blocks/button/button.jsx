import React, {Component} from 'react';

import classnames from 'classnames';

import './button.css';

/**
 * @class
 * @extends Component
 */
export default class Button extends Component {
    /**
     * @static
     */
    static propTypes = {
        className: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        name: React.PropTypes.string,
        type: React.PropTypes.oneOf([
            'button',
            'reset',
            'submit'
        ])
    }

    /**
     * @static
     */
    static defaultProps = {
        className: null,
        disabled: false,
        name: null,
        type: 'button'
    }

    render() {
        return (
            <button
                className={classnames(
                    'button',
                    this.props.className
                )}
                disabled={this.props.disabled}
                name={this.props.name}
                onClick={this.props.onClick}
                type={this.props.type}>
                {this.props.children}
            </button>
        );
    }
}
