/**
 * Storage
 *
 * @type {object}
 * @member {boolean} isActivePopup
 * @member {object} game
 * @member {boolean} game.hasAWinner
 * @member {array} game.matrix
 * @member {number} game.victoryChainsLength
 * @member {number} game.player
 * @member {object} history
 * @member {number} history.defeats
 * @member {number} history.wins
 */
const INITIAL_STATE = {
    isActivePopup: false,
    game: {
        hasAWinner: false,
        isGoing: true,
        matrix: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        player: 1,
        victoryChainsLength: 3
    },
    history: {
        defeats: 0,
        wins: 0
    }
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_MATRIX':
            if (!Array.isArray(action.matrix) || !action.matrix.every((row, i, matrix) => {
                return Array.isArray(row) && matrix[0].length === row.length;
            })) {
                // Not valid
                return state;
            }

            return {
                ...state,
                game: {
                    ...state.game,
                    matrix: action.matrix
                }
            };

        case 'SET_MATRIX_VALUE':
            if (state.game.matrix[action.y] === undefined ||
                state.game.matrix[action.y][action.x] === undefined ||
                Math.abs(action.value) > 1) {
                // Not valid
                return state;
            }

            return {
                ...state,
                game: {
                    ...state.game,
                    matrix: state.game.matrix.map((row, y) => {
                        return row.map((value, x) => {
                            if (y === action.y && x === action.x) {
                                return action.value;
                            } else {
                                return value;
                            }
                        });
                    })
                }
            };

        case 'RESET_MATRIX':
            return {
                ...state,
                game: {
                    ...state.game,
                    matrix: state.game.matrix.map((row) => {
                        return row.map((value) => {
                            return 0;
                        });
                    })
                }
            };

        case 'SET_VICTORY_CHAINS_LENGTH':
            if (action.value < 3) {
                // Not valid
                return state;
            }

            return {
                ...state,
                game: {
                    ...state.game,
                    victoryChainsLength: action.value
                }
            };

        case 'GAME_START':
            return {
                ...state,
                game: {
                    ...state.game,
                    isGoing: true
                }
            };

        case 'GAME_STOP':
            return {
                ...state,
                game: {
                    ...state.game,
                    isGoing: false
                }
            };

        case 'CHANGE_PLAYER':
            return {
                ...state,
                game: {
                    ...state.game,
                    player: state.game.player * (-1)
                }
            };

        case 'RESET_PLAYER':
            return {
                ...state,
                game: {
                    ...state.game,
                    player: 1
                }
            };

        case 'SET_A_WINNER':
            return {
                ...state,
                game: {
                    ...state.game,
                    hasAWinner: Boolean(action.value)
                }
            };

        case 'RESET_WINNER':
            return {
                ...state,
                game: {
                    ...state.game,
                    hasAWinner: false
                }
            };

        case 'INCREASE_COUNTER_OF_WINS':
            return {
                ...state,
                history: {
                    ...state.history,
                    wins: state.history.wins + 1
                }
            };

        case 'INCREASE_COUNTER_OF_DEFEATS':
            return {
                ...state,
                history: {
                    ...state.history,
                    defeats: state.history.defeats + 1
                }
            };

        case 'ACTIVATE_POPUP':
            return {
                ...state,
                isActivePopup: (action.activate === null || action.activate === undefined) ? true : action.activate
            };

        default:
            return state;
    }
};
