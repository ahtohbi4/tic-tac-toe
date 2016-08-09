const initialState = {
    wins: 0,
    defeats: 0,
    game: {
        matrix: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        hasWinner: false
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_MATRIX_VALUE':
            if (!state.game.matrix[action.y] || !state.game.matrix[action.y][action.x] || Math.abs(action.value) > 1) {
                // Not valid
                return state;
            }

            return {
                ...state,
                matrix: state.game.matrix.map((row, y) => {
                    return row.map((value, x) => {
                        if (y === action.y && x === action.x) {
                            return action.value;
                        } else {
                            return value;
                        }
                    });
                })
            };

        case 'INCREASE_COUNTER_OF_WINS':
            return {
                ...state,
                wins: state.wins + 1
            };

        case 'INCREASE_COUNTER_OF_DEFEATS':
            return {
                ...state,
                defeats: state.defeats + 1
            };

        default:
            return state;
    }
}
