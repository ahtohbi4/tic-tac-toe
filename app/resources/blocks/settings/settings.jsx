import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {activatePopup, setMatrix, setVictoryChainsLength} from '../../../actions/';

import Matrix from 'matrix-slicer';

import Button from '../button/button';
import InputNumber from '../input-number/input-number';
import Popup from '../popup/popup';

import './settings.css';
import '../hidden/hidden.css';

/**
 * @class
 * @extends Component
 */
class SettingsBlank extends Component {
    constructor() {
        super();

        this.state = {
            maxVictoryChainsLength: 3,
            wasChanged: false
        };

        this.handleApply = this.handleApply.bind(this);
        this.handleOpenSettings = this.handleOpenSettings.bind(this);
        this.handleResume = this.handleResume.bind(this);
        this.handleStartNewGame = this.handleStartNewGame.bind(this);
        this.onSettingsUpdate = this.onSettingsUpdate.bind(this);
    }

    /**
     * Start a new game
     */
    handleStartNewGame() {
        this.props.startNewGame();

        this.props.activatePopup(false);
    }

    /**
     * Display settings form
     */
    handleOpenSettings() {
        this._formSettings.classList.remove('hidden');

        this._items.classList.add('hidden');
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

    /**
     * Callback function for inputs update
     */
    onSettingsUpdate(e) {
        if (
            this._inputWidth.state.value !== this.props.game.matrix[0].length ||
            this._inputHeight.state.value !== this.props.game.matrix.length ||
            this._inputVictoryChainsLength.state.value !== this.props.game.victoryChainsLength
        ) {
            if (!this.state.wasChanged) {
                this.setState({
                    wasChanged: true
                });
            }
        } else {
            if (this.state.wasChanged) {
                this.setState({
                    wasChanged: false
                });
            }
        }

        this.setState({
            maxVictoryChainsLength: Math.min(this._inputWidth.state.value, this._inputHeight.state.value)
        });
    }

    render() {
        const width = this.props.game.matrix[0].length;
        const height = this.props.game.matrix.length;
        const victoryChainsLength = this.props.game.victoryChainsLength;

        return (
            <Popup title="Game Settings">
                <ul
                    className="settings__items"
                    ref={c => this._items = c}>
                    <li className="settings__item">
                        <button
                            className="settings__item-button"
                            onClick={this.handleStartNewGame}
                            type="button">Start a New Game</button>
                    </li>

                    <li className="settings__item">
                        <button
                            className="settings__item-button"
                            onClick={this.handleOpenSettings}
                            type="button">New Game with Settings</button>
                    </li>

                    <li className="settings__item">
                        <button
                            className="settings__item-button"
                            onClick={this.handleResume}
                            type="button">Resume Game</button>
                    </li>
                </ul>

                <form
                    className="settings__form hidden"
                    ref={c => this._formSettings = c}>
                    <div>
                        <label>Width:</label>
                        <InputNumber
                            maxValue={10}
                            minValue={3}
                            name="width"
                            onChange={this.onSettingsUpdate}
                            ref={c => this._inputWidth = c}
                            value={width}/>
                    </div>

                    <div>
                        <label>Height:</label>
                        <InputNumber
                            maxValue={10}
                            minValue={3}
                            name="height"
                            onChange={this.onSettingsUpdate}
                            ref={c => this._inputHeight = c}
                            value={height}/>
                    </div>

                    <div>
                        <label>Length of Chain to win:</label>
                        <InputNumber
                            maxValue={this.state.maxVictoryChainsLength}
                            minValue={3}
                            name="victoryChainsLength"
                            onChange={this.onSettingsUpdate}
                            ref={c => this._inputVictoryChainsLength = c}
                            value={victoryChainsLength}/>
                    </div>

                    <div>
                        <Button
                            onClick={this.handleResume}
                            type="reset">Resume</Button>

                        <Button
                            onClick={this.handleApply}
                            disabled={!this.state.wasChanged}
                            type="submit">Apply</Button>
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
            <button className="settings__control" onClick={this.handleClick} type="button">
                <span className="settings__control-label">Settings</span>
            </button>
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
