const initialState = {
    isActivePopup: false,
    game: {
        hasAWinner: false,
        matrix: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        victoryChainsLength: 3,
        player: 1
    },
    history: {
        defeats: 0,
        wins: 0
    }
};

export default function (state = initialState, action) {
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
}
