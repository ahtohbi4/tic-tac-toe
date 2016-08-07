const initialState = {
    matrix: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
};

function game(state = initialState, action) {
    switch (action.type) {
        case 'SET_MATRIX_VALUE':
            if (state.matrix[action.y] && state.matrix[action.y][action.x] && Math.abs(action.value) <= 1) {
                // Valid
                return {
                    ...state,
                    matrix: state.matrix.map((row, y) => {
                        return row.map((value, x) => {
                            if (y === action.y && x === action.x) {
                                return action.value;
                            } else {
                                return value;
                            }
                        });
                    })
                };
            } else {
                return state;
            }

        default:
            return state;
    }
}
