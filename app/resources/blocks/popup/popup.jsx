import React, {Component} from 'react';

import classnames from 'classnames';

/**
 * @class
 * @extends Component
 */
export default class Popup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mounted: false
        };
    }

    componentDidMount() {
        this.setState({
            mounted: true
        });
    }

    render() {
        return (
            <div className={classnames('popup', {
                'popup_mounted': this.state.mounted
            })}>
                <div className="popup__box">
                    <h4 className="popup__title">{this.props.title}</h4>

                    <div className="popup__content">{this.props.children}</div>
                </div>

                <div className="popup__cover"></div>
            </div>
        );
    }
};
