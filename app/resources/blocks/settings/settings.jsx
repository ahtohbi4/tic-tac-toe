import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {activatePopup} from '../../../actions/';

import InputNumber from '../input-number/input-number';
import Popup from '../popup/popup';

/**
 * @class
 * @extends Component
 */
class SettingsBlank extends Component {
    render() {
        const width = this.props.game.matrix[0].length;
        const height = this.props.game.matrix.length;

        return (
            <Popup title="Game Settings">
                <form action="">
                    <div>
                        <label>width:</label>
                        <InputNumber value={width} minValue="3"/>
                    </div>

                    <div>
                        <label>height:</label>
                        <InputNumber value={height} minValue="3"/>
                    </div>

                    <div>
                        <button type="reset">Resume</button>

                        <button type="submit">Apply</button>
                    </div>
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
