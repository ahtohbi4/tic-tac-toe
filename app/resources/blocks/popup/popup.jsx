import React, {Component} from 'react';

import classnames from 'classnames';

/**
 * @class
 * @extends Component
 */
export default class Popup extends Component {
    render() {
        return (
            <div className="popup">
                <div className="popup__box">
                    <h4 className="popup__title">{this.props.title}</h4>

                    <div className="popup__content">{this.props.children}</div>
                </div>

                <div className="popup__cover"></div>
            </div>
        );
    }
};
