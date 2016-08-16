import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {activatePopup} from '../../../actions/';

import InputNumber from '../input-number/input-number';
import Popup from '../popup/popup';
import Radio, {RadioItem} from '../radio/radio';

/**
 * @class
 * @extends Component
 */
class SettingsBlank extends Component {
    constructor() {
        super();

        this.resume = this.resume.bind(this);
    }

    resume() {
        this.props.activatePopup(false);
    }

    render() {
        const width = this.props.game.matrix[0].length;
        const height = this.props.game.matrix.length;

        return (
            <Popup title="Game Settings">
                <form action="">
                    <div>
                        <label>width:</label>
                        <InputNumber value={width} minValue={3} maxValue={10}/>
                    </div>

                    <div>
                        <label>height:</label>
                        <InputNumber value={height} minValue={3} maxValue={10}/>
                    </div>

                    <div>
                        <label>Length of the wins Chain:</label>
                        <InputNumber value={this.props.game.victoryChainsLength} minValue={3} maxValue={10}/>
                    </div>

                    <div>
                        <label>rival:</label>
                        <Radio name="rival" items={[
                            {
                                value: 'cpu',
                                label: 'CPU'
                            },
                            {
                                value: 'man',
                                label: 'MAN'
                            }
                        ]}/>
                    </div>

                    <div>
                        <button onClick={this.resume} type="reset">Resume</button>

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

function mapDispatchToProps(dispatch) {
    return {
        activatePopup: bindActionCreators(activatePopup, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
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
