import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {activatePopup} from '../../../actions/';

import Popup from '../popup/popup';

/**
 * @class
 * @extends Component
 */
class SettingsBlank extends Component {
    render() {
        return (
            <Popup title="Game Settings">
                <form action="">
                    <label>width:</label>
                    <input value={this.props.game.matrix[0].length}/>

                    <label>height:</label>
                    <input value={this.props.game.matrix.length}/>

                    <button type="reset">Resume</button>

                    <button type="submit">Apply</button>
                </form>
            </Popup>
        );
    }
};

function mapStateToProps(state) {
    return {
        game: state.game
    };
}

export default connect(
    mapStateToProps
)(SettingsBlank);

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
        return (
            <button className="settings__control" onClick={this.handleClick} type="button"></button>
        );
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
