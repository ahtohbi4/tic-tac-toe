import React, {Component} from 'react';
import {connect} from 'react-redux';

import classnames from 'classnames';

import Game from '../game/game';
import Score from '../score/score';
import Settings, {SettingsControl} from '../settings/settings';

/**
 * @class
 * @extends Component
 */
class App extends Component {
    render() {
        return <div className={classnames(
            'app',
            {
                'app_with-popup': this.props.isActivePopup
            }
        )}>
            <div className="app__content">
                <SettingsControl/>

                <h1 className="app__title">Tic-Tac-Toe</h1>

                <Score/>

                <Game/>
            </div>

            {this.props.isActivePopup ? <Settings/> : null}
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        isActivePopup: state.isActivePopup,
        game: state.game
    };
}

export default connect(
    mapStateToProps
)(App);
