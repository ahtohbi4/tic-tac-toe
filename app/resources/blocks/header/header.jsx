import React, {Component} from 'react';

import {SettingsControl} from '../settings/settings';
import Logo from '../logo/logo';

/**
 * @class
 * @extends Component
 */
export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <Logo/>

                <SettingsControl/>
            </header>
        );
    }
}
