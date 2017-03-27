import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import './board.css';

/**
 * @class
 * @extends Component
 *
 * @props {number} x
 * @props {number} y
 * @props {number} isClickable
 * @props {number} type - Type of cell. Possible values is -1 or 1.
 */
class BoardCell extends Component {
    static propTypes = {
        type: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        isClickable: PropTypes.bool,
        x: PropTypes.number,
        y: PropTypes.number,

        onClick: PropTypes.func,
    };

    static defaultProps = {
        isClickable: false,
        x: null,
        y: null,

        onClick: () => null,
    };

    constructor(props) {
        super(props);

        this.state = {
            isClickable: props.isClickable,
            type: props.type,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isClickable: nextProps.isClickable,
            type: nextProps.type,
        });
    }

    get type() {
        const TYPES = {
            '-1': 'board__cell_type_o',
            1: 'board__cell_type_x',
        };

        return TYPES[this.state.type] || undefined;
    }

    handleClick() {
        if (this.state.isClickable) {
            const { x, y } = this.props;

            this.props.onClick(x, y);
        }
    }

    render() {
        return (
            <button
                className={classnames(
                    'board__cell',
                    {
                        board__cell_clickable: this.state.isClickable,
                        [this.type]: this.type,
                    },
                )}
                type="button"

                onClick={this.handleClick}
            >
                <div className="board__cell-spacer" />
            </button>
        );
    }
}

export default connect(
    (state) => ({
        game: state.game,
    }),
)(BoardCell);
