import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Matrix from 'matrix-slicer';

import {
    activatePopup,
    setMatrix,
    setVictoryChainsLength,
} from '../../../actions/';

import Button from '../Button';
import InputNumber from '../InputNumber';
import Popup from '../Popup';

import './settings.css';
import '../Hidden/hidden.css';

/**
 * @class
 * @extends Component
 */
class Settings extends Component {
    static propTypes = {
        game: PropTypes.shape({
            matrix: PropTypes.array,
            victoryChainsLength: PropTypes.number,
        }).isRequired,

        activatePopup: PropTypes.func.isRequired,
        setMatrix: PropTypes.func.isRequired,
        setVictoryChainsLength: PropTypes.func.isRequired,
        startNewGame: PropTypes.func.isRequired,
    };

    constructor() {
        super();

        this.defaultTitle = 'Main Menu';

        this.state = {
            maxVictoryChainsLength: 3,
            title: this.defaultTitle,
            wasChanged: false,
        };

        this.onSettingsUpdate = this.onSettingsUpdate.bind(this);
        this.handleStartNewGame = this.handleStartNewGame.bind(this);
        this.handleOpenSettings = this.handleOpenSettings.bind(this);
        this.handleResume = this.handleResume.bind(this);
        this.handleApply = this.handleApply.bind(this);
        this.handleOpenAbout = this.handleOpenAbout.bind(this);
        this.backToMenu = this.backToMenu.bind(this);
    }

    componentWillMount() {
        this.ghButtonScript = document.createElement('script'); // eslint-disable-line no-undef
        this.ghButtonScript.src = 'https://buttons.github.io/buttons.js';
        document.body.appendChild(this.ghButtonScript); // eslint-disable-line no-undef
    }

    componentWillUnmount() {
        document.body.removeChild(this.ghButtonScript); // eslint-disable-line no-undef
    }

    /**
     * Callback function for inputs update.
     */
    onSettingsUpdate() {
        if (
            (this.$inputWidth.state.value !== this.props.game.matrix[0].length ||
            this.$inputHeight.state.value !== this.props.game.matrix.length ||
            this.$inputVictoryChainsLength.state.value !== this.props.game.victoryChainsLength) &&
            !this.state.wasChanged
        ) {
            this.setState({
                wasChanged: true,
            });
        } else if (this.state.wasChanged) {
            this.setState({
                wasChanged: false,
            });
        }

        this.setState({
            maxVictoryChainsLength: Math.min(this.$inputWidth.state.value, this.$inputHeight.state.value),
        });
    }

    /**
     * Start a new game.
     */
    handleStartNewGame() {
        this.props.startNewGame();
        this.props.activatePopup(false);
    }

    /**
     * Display settings form
     */
    handleOpenSettings() {
        this.setState({
            title: 'Game settings',
        });
        this.$items.classList.add('hidden');
        this.$settingsForm.classList.remove('hidden');
    }

    /**
     * Resume a game.
     */
    handleResume() {
        this.props.activatePopup(false);
    }

    /**
     * Apply new settings and start a new game.
     *
     * @param {object} e
     */
    handleApply(event) {
        event.preventDefault();

        const matrix = new Matrix(this.$inputWidth.state.value, this.$inputHeight.state.value);

        this.props.setMatrix(matrix.get());
        this.props.setVictoryChainsLength(this.$inputVictoryChainsLength.state.value);
        this.props.startNewGame();

        this.props.activatePopup(false);
    }

    /**
     * Display information about the game.
     */
    handleOpenAbout() {
        this.setState({
            title: 'About the Game',
        });
        this.$items.classList.add('hidden');
        this.$about.classList.remove('hidden');
    }

    /**
     * Back to menu.
     */
    backToMenu() {
        this.setState({
            title: this.defaultTitle,
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
                <ul className="settings__items" ref={(c) => (this.$items = c)}>
                    <li className="settings__item">
                        <button
                            className="settings__item-button"
                            type="button"

                            onClick={this.handleStartNewGame}
                        >
                            Start a New Game
                        </button>
                    </li>

                    <li className="settings__item">
                        <button
                            className="settings__item-button"
                            type="button"

                            onClick={this.handleOpenSettings}
                        >
                            Settings for a New Game
                        </button>
                    </li>

                    <li className="settings__item">
                        <button
                            className="settings__item-button"
                            type="button"

                            onClick={this.handleOpenAbout}
                        >
                            About the Game
                        </button>
                    </li>

                    <li className="settings__item">
                        <button
                            className="settings__item-button"
                            type="button"

                            onClick={this.handleResume}
                        >
                            Resume Game
                        </button>
                    </li>
                </ul>

                <form className="settings__form hidden" ref={(c) => (this.$settingsForm = c)}>
                    <div className="settings__field">
                        <label htmlFor="boardWidth" className="settings__label">Width:</label>
                        <InputNumber
                            id="boardWidth"
                            maxValue={10}
                            minValue={3}
                            name="width"
                            onChange={this.onSettingsUpdate}
                            ref={(c) => (this.$inputWidth = c)}
                            value={width}
                        />
                    </div>

                    <div className="settings__field">
                        <label htmlFor="boardHeight" className="settings__label">Height:</label>
                        <InputNumber
                            id="boardHeight"
                            maxValue={10}
                            minValue={3}
                            name="height"
                            ref={(c) => (this.$inputHeight = c)}
                            value={height}

                            onChange={this.onSettingsUpdate}
                        />
                    </div>

                    <div className="settings__field">
                        <label htmlFor="chainToWin" className="settings__label">
                            Length<span className="settings__sub-label"> of Chain to win</span>:
                        </label>
                        <InputNumber
                            id="chainToWin"
                            maxValue={this.state.maxVictoryChainsLength}
                            minValue={3}
                            name="victoryChainsLength"
                            ref={(c) => (this.$inputVictoryChainsLength = c)}
                            value={victoryChainsLength}

                            onChange={this.onSettingsUpdate}
                        />
                    </div>

                    <div className="settings__controls-field">
                        <Button
                            type="reset"

                            onClick={this.handleResume}
                        >
                            Resume
                        </Button>

                        <Button
                            disabled={!this.state.wasChanged}
                            type="submit"

                            onClick={this.handleApply}
                        >
                            Apply
                        </Button>
                    </div>
                </form>

                <div
                    className="settings__about hidden"
                    ref={(c) => (this.$about = c)}
                >
                    <p>The Game was created using React+Redux.</p>
                    <p>Please create an issue on GitHub<br /> to report a bug.</p>

                    <p>
                        <a
                            aria-label="@ahtohbi4 on GitHub"
                            className="github-button"
                            data-style="mega"
                            href="https://github.com/ahtohbi4/tic-tac-toe"
                        >
                            @ahtohbi4
                        </a>
                    </p>

                    <Button
                        type="button"

                        onClick={this.backToMenu}
                    >
                        Back
                    </Button>
                </div>
            </Popup>
        );
    }
}

export default connect(
    (state) => ({
        game: state.game,
    }),
    (dispatch) => ({
        activatePopup: bindActionCreators(activatePopup, dispatch),
        setMatrix: bindActionCreators(setMatrix, dispatch),
        setVictoryChainsLength: bindActionCreators(setVictoryChainsLength, dispatch),
    }),
)(Settings);
