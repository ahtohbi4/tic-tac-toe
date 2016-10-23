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

        this.defaultTitle = 'Main Menu';

        this.state = {
            maxVictoryChainsLength: 3,
            title: this.defaultTitle,
            wasChanged: false
        };
    }

    componentWillMount = () => {
        this.ghButtonScript = document.createElement('script');
        this.ghButtonScript.src = 'https://buttons.github.io/buttons.js';
        document.body.appendChild(this.ghButtonScript);
    }

    componentWillUnmount = () => {
        /* @todo Need in refactoring. */
        document.body.removeChild(this.ghButtonScript);
    }

    /**
     * Start a new game.
     */
    handleStartNewGame = () => {
        this.props.startNewGame();
        this.props.activatePopup(false);
    }

    /**
     * Display settings form
     */
    handleOpenSettings = () => {
        this.setState({
            title: 'Game settings'
        });
        this.$items.classList.add('hidden');
        this.$settingsForm.classList.remove('hidden');
    }

    /**
     * Resume a game.
     */
    handleResume = () => {
        this.props.activatePopup(false);
    }

    /**
     * Apply new settings and start a new game.
     *
     * @param {object} e
     */
    handleApply = (e) => {
        e.preventDefault();

        const matrix = new Matrix(this.$inputWidth.state.value, this.$inputHeight.state.value);

        this.props.setMatrix(matrix.get());
        this.props.setVictoryChainsLength(this.$inputVictoryChainsLength.state.value);
        this.props.startNewGame();

        this.props.activatePopup(false);
    }

    /**
     * Callback function for inputs update.
     */
    onSettingsUpdate = () => {
        if (
            this.$inputWidth.state.value !== this.props.game.matrix[0].length ||
            this.$inputHeight.state.value !== this.props.game.matrix.length ||
            this.$inputVictoryChainsLength.state.value !== this.props.game.victoryChainsLength
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
            maxVictoryChainsLength: Math.min(this.$inputWidth.state.value, this.$inputHeight.state.value)
        });
    }

    /**
     * Display information about the game.
     */
    handleOpenAbout = () => {
        this.setState({
            title: 'About the Game'
        });
        this.$items.classList.add('hidden');
        this.$about.classList.remove('hidden');
    }

    /**
     * Back to menu.
     */
    backToMenu = () => {
        this.setState({
            title: this.defaultTitle
        });
        this.$about.classList.add('hidden');
        this.$items.classList.remove('hidden');
    }

    render() {
        const width = this.props.game.matrix[0].length;
        const height = this.props.game.matrix.length;
        const victoryChainsLength = this.props.game.victoryChainsLength;

        return (
            <Popup title={this.state.title}>
                <ul
                    className="settings__items"
                    ref={c => this.$items = c}>
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
                            type="button">Settings for a New Game</button>
                    </li>

                    <li className="settings__item">
                        <button
                            className="settings__item-button"
                            onClick={this.handleOpenAbout}
                            type="button">About the Game</button>
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
                    ref={c => this.$settingsForm = c}>
                    <div className="settings__field">
                        <label className="settings__label">Width:</label>
                        <InputNumber
                            maxValue={10}
                            minValue={3}
                            name="width"
                            onChange={this.onSettingsUpdate}
                            ref={c => this.$inputWidth = c}
                            value={width}/>
                    </div>

                    <div className="settings__field">
                        <label className="settings__label">Height:</label>
                        <InputNumber
                            maxValue={10}
                            minValue={3}
                            name="height"
                            onChange={this.onSettingsUpdate}
                            ref={c => this.$inputHeight = c}
                            value={height}/>
                    </div>

                    <div className="settings__field">
                        <label className="settings__label">Length<span className="settings__sub-label"> of Chain to win</span>:</label>
                        <InputNumber
                            maxValue={this.state.maxVictoryChainsLength}
                            minValue={3}
                            name="victoryChainsLength"
                            onChange={this.onSettingsUpdate}
                            ref={c => this.$inputVictoryChainsLength = c}
                            value={victoryChainsLength}/>
                    </div>

                    <div className="settings__controls-field">
                        <Button
                            onClick={this.handleResume}
                            type="reset">Resume</Button>

                        <Button
                            onClick={this.handleApply}
                            disabled={!this.state.wasChanged}
                            type="submit">Apply</Button>
                    </div>
                </form>

                <div
                    className="settings__about hidden"
                    ref={c => this.$about = c}>
                    <p>The Game was created using React+Redux.</p>
                    <p>Please create an issue on GitHub<br/> to report a bug.</p>

                    <p>
                        <a
                            aria-label="@ahtohbi4 on GitHub"
                            className="github-button"
                            data-style="mega"
                            href="https://github.com/ahtohbi4/tic-tac-toe">@ahtohbi4</a>
                    </p>

                    <Button
                        onClick={this.backToMenu}
                        type="button">Back</Button>
                </div>
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
