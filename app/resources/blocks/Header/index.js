import React from 'react';

import SettingsControl from '../SettingsControl';
import Logo from '../Logo';

import './styles.css';

/**
 * @class
 * @extends Component
 */
export default function Header() {
    return (
        <header className="header">
            <Logo />

            <SettingsControl />
        </header>
    );
}
