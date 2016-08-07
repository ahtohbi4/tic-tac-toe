import React, {Component} from 'react';

/**
 * @class
 * @extends Component
 */
export default class Board extends Component {
    render() {
        return <div className="board"></div>;
    }
}

/**
 * @class
 * @extends Component
 */
export class BoardRow extends Component {
    render() {
        return <div className="board__row"></div>
    }
}

/**
 * @class
 * @extends Component
 */
export class BoardCell extends Component {
    render() {
        return <div className="board__cell"></div>
    }
}
