import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {activatePopup} from '../../../actions/';

import Popup from '../popup/popup';

/**
 * @class
 * @extends Component
 */
export default class Settings extends Component {
    render() {
        return <Popup title="Game Settings">
            <form action="">
                <input type="checkbox"/>
            </form>
        </Popup>;
    }
}

/**
 * @class
 * @extends Component
 */
class SettingsControlBlank extends Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.activatePopup(true);
    }

    render() {
        return <button className="settings__control" onClick={this.handleClick} type="button"></button>;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        activatePopup: bindActionCreators(activatePopup, dispatch)
    }
}

export const SettingsControl = connect(
    null,
    mapDispatchToProps
)(SettingsControlBlank);
