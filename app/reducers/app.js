const initialState = {
    isActivePopup: false,
    game: {
        hasWinner: false,
        matrix: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    },
    history: {
        defeats: 0,
        wins: 0
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
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
