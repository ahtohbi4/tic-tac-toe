import React, {Component} from 'react';
import {connect} from 'react-redux';

import {activatePopup} from '../../../actions/';

/**
 * @class
 * @extends Component
 */
class SettingsControl extends Component {
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
        activatePopup
    }
}

export default connect(
    null,
    mapDispatchToProps
)(SettingsControl);
