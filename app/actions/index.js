/**
 * @param {object} matrix
 * @returns {object}
 */
export const setMatrix = (matrix) => {
    return {
        type: 'SET_MATRIX',
        matrix
    };
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} value
 * @returns {object}
 */
export const setMatrixValue = (x, y, value) => {
    return {
        type: 'SET_MATRIX_VALUE',
        x,
        y,
        value
    };
};

/**
 * @returns {object}
 */
export const resetMatrix = () => {
    return {
        type: 'RESET_MATRIX'
    };
};

/**
 * @param {object} matrix
 * @returns {object}
 */
export const setVictoryChainsLength = (value) => {
    return {
        type: 'SET_VICTORY_CHAINS_LENGTH',
        value
    };
};

/**
 * @returns {object}
 */
export const changePlayer = () => {
    return {
        type: 'CHANGE_PLAYER'
    };
};

/**
 * @returns {object}
 */
export const resetPlayer = () => {
    return {
        type: 'RESET_PLAYER'
    };
};

/**
 * @returns {object}
 */
export const setAWinner = (value) => {
    return {
        type: 'SET_A_WINNER',
        value
    };
};

/**
 * @returns {object}
 */
export const resetWinner = () => {
    return {
        type: 'RESET_WINNER'
    };
};

/**
 * @returns {object}
 */
export const increaseCounterOfWins = () => {
    return {
        type: 'INCREASE_COUNTER_OF_WINS'
    };
};

/**
 * @returns {object}
 */
export const increaseCounterOfDefeats = () => {
    return {
        type: 'INCREASE_COUNTER_OF_DEFEATS'
    };
};

/**
 * @param {boolean} activate
 * @returns {object}
 */
export const activatePopup = (activate) => {
    return {
        type: 'ACTIVATE_POPUP',
        activate
    };
};
