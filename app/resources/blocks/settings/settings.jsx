import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {activatePopup, setMatrix, setVictoryChainsLength} from '../../../actions/';

import Matrix from 'matrix-slicer';

import InputNumber from '../input-number/input-number';
import Popup from '../popup/popup';

/**
 * @class
 * @extends Component
 */
class SettingsBlank extends Component {
    constructor() {
        super();

        this.state = {
            wasChanged: false
        };

        this.handleStartNewGame = this.handleStartNewGame.bind(this);
        this.onSettingsUpdate = this.onSettingsUpdate.bind(this);
        this.handleResume = this.handleResume.bind(this);
        this.handleApply = this.handleApply.bind(this);
    }

    /**
     * Start a new game
     */
    handleStartNewGame() {
        this.props.startNewGame();

        this.props.activatePopup(false);
    }

    /**
     * Resume a game
     */
    handleResume() {
        this.props.activatePopup(false);
    }

    /**
     * Apply new settings and start a new game
     *
     * @param {object} e
     */
    handleApply(e) {
        e.preventDefault();

        const matrix = new Matrix(this._inputWidth.state.value, this._inputHeight.state.value);

        this.props.setMatrix(matrix.get());
        this.props.setVictoryChainsLength(this._inputVictoryChainsLength.state.value);
        this.props.startNewGame();

        this.props.activatePopup(false);
    }

    onSettingsUpdate() {
        if (
            this._inputWidth.state.value === this.props.game.matrix[0].length &&
            this._inputHeight.state.value === this.props.game.matrix.length &&
            this._inputVictoryChainsLength.state.value === this.props.game.victoryChainsLength
        ) {
            if (this.state.wasChanged) {
                this.setState({
                    wasChanged: false
                });
            }
        } else {
            if (!this.state.wasChanged) {
                this.setState({
                    wasChanged: true
                });
            }
        }
    }

    render() {
        const width = this.props.game.matrix[0].length;
        const height = this.props.game.matrix.length;
        const victoryChainsLength = this.props.game.victoryChainsLength;

        return (
            <Popup title="Game Settings">
                <form action="">
                    <div>
                        <button type="button" onClick={this.handleStartNewGame}>New Game</button>
                    </div>

                    <div>
                        <label>Width:</label>
                        <InputNumber
                            value={width}
                            minValue={3}
                            maxValue={10}
                            ref={c => this._inputWidth = c}
                            onChange={this.onSettingsUpdate}/>
                    </div>

                    <div>
                        <label>Height:</label>
                        <InputNumber
                            value={height}
                            minValue={3}
                            maxValue={10}
                            ref={c => this._inputHeight = c}
                            onChange={this.onSettingsUpdate}/>
                    </div>

                    <div>
                        <label>Length of the wins Chain:</label>
                        <InputNumber
                            value={victoryChainsLength}
                            minValue={3}
                            maxValue={10}
                            ref={c => this._inputVictoryChainsLength = c}
                            onChange={this.onSettingsUpdate}/>
                    </div>

                    <div>
                        <button
                            onClick={this.handleResume}
                            type="reset">Resume</button>

                        <button
                            onClick={this.handleApply}
                            disabled={!this.state.wasChanged}
                            type="submit">Apply</button>
                    </div>
                </form>
            </Popup>
        );
    }
}

export default connect(
    (state) => {
        return {
            game: state.game
        };
    },
    (dispatch) => {
        return {
            activatePopup: bindActionCreators(activatePopup, dispatch),
            setMatrix: bindActionCreators(setMatrix, dispatch),
            setVictoryChainsLength: bindActionCreators(setVictoryChainsLength, dispatch)
        }
    }
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

export const SettingsControl = connect(
    null,
    (dispatch) => {
        return {
            activatePopup: bindActionCreators(activatePopup, dispatch)
        }
    }
)(SettingsControlBlank);
