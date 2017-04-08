import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

/**
 * @function
 */
function Popup(props) {
    const { title, children } = props;

    return (
        <div className="popup">
            <div className="popup__box">
                <h4 className="popup__title">{title}</h4>

                <div className="popup__content">{children}</div>
            </div>

            <div className="popup__cover" />
        </div>
    );
}

Popup.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
};

export default Popup;
