/**
 * @param {object} matrix
 * @returns {object}
 */
export function setMatrix(matrix) {
    return {
        type: 'SET_MATRIX',
        matrix,
    };
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} value
 * @returns {object}
 */
export function setMatrixValue(x, y, value) {
    return {
        type: 'SET_MATRIX_VALUE',
        x,
        y,
        value,
    };
}

/**
 * @returns {object}
 */
export function resetMatrix() {
    return {
        type: 'RESET_MATRIX',
    };
}

/**
 * @param {object} matrix
 * @returns {object}
 */
export function setVictoryChainsLength(value) {
    return {
        type: 'SET_VICTORY_CHAINS_LENGTH',
        value,
    };
}

/**
 * @returns {object}
 */
export function gameStart() {
    return {
        type: 'GAME_START',
    };
}

/**
 * @returns {object}
 */
export function gameStop() {
    return {
        type: 'GAME_STOP',
    };
}

/**
 * @returns {object}
 */
export function changePlayer() {
    return {
        type: 'CHANGE_PLAYER',
    };
}

/**
 * @returns {object}
 */
export function resetPlayer() {
    return {
        type: 'RESET_PLAYER',
    };
}

/**
 * @returns {object}
 */
export function setAWinner(value) {
    return {
        type: 'SET_A_WINNER',
        value,
    };
}

/**
 * @returns {object}
 */
export function resetWinner() {
    return {
        type: 'RESET_WINNER',
    };
}

/**
 * @returns {object}
 */
export function increaseCounterOfWins() {
    return {
        type: 'INCREASE_COUNTER_OF_WINS',
    };
}

/**
 * @returns {object}
 */
export function increaseCounterOfDefeats() {
    return {
        type: 'INCREASE_COUNTER_OF_DEFEATS',
    };
}

/**
 * @param {boolean} activate
 * @returns {object}
 */
export function activatePopup(activate) {
    return {
        type: 'ACTIVATE_POPUP',
        activate,
    };
}
