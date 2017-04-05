import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    activatePopup,
} from '../../../actions/';

/**
 * @class
 * @extends Component
 */
class SettingsControl extends Component {
    static propTypes = {
        activatePopup: PropTypes.func.isRequired,
    };

    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.activatePopup(true);
    }

    render() {
        return (
            <button className="settings__control" onClick={this.handleClick} type="button">
                <span className="settings__control-label">Settings</span>
            </button>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        activatePopup: bindActionCreators(activatePopup, dispatch),
    }),
)(SettingsControl);
