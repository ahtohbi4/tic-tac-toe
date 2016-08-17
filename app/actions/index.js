/**
 * @param {object} matrix
 * @returns {object}
 */
export const setMatrix = (matrix) => {
    return {
        type: 'SET_MATRIX',
        matrix
    };
}

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
}

/**
 * @param {object} matrix
 * @returns {object}
 */
export const setVictoryChainsLength = (value) => {
    return {
        type: 'SET_VICTORY_CHAINS_LENGTH',
        value
    };
}

/**
 * @returns {object}
 */
export const changePlayer = () => {
    return {
        type: 'CHANGE_PLAYER'
    };
}

/**
 * @returns {object}
 */
export const increaseCounterOfWins = () => {
    return {
        type: 'INCREASE_COUNTER_OF_WINS'
    };
}

/**
 * @returns {object}
 */
export const increaseCounterOfDefeats = () => {
    return {
        type: 'INCREASE_COUNTER_OF_DEFEATS'
    };
}

/**
 * @param {boolean} activate
 * @returns {object}
 */
export const activatePopup = (activate) => {
    return {
        type: 'ACTIVATE_POPUP',
        activate
    };
}
