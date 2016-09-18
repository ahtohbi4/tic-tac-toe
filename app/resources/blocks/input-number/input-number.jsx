import React, {Component, PropTypes} from 'react';

/**
 * @class
 * @extends Component
 *
 * @props {string} name
 * @props {number} [value=0]
 * @props {number} [minValue]
 * @props {number} [maxValue]
 * @props {function} [onChange] - Callback function with a single parameter - input object.
 */
export default class InputNumber extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value || 0
        };

        this.name = props.name;

        this.decreaseValue = this.decreaseValue.bind(this);
        this.increaseValue = this.increaseValue.bind(this);
    }

    static propTypes = {
        maxValue: PropTypes.number,
        minValue: PropTypes.number,
        name: PropTypes.string,
        onChange: PropTypes.func
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.minValue > this.state.value) {
            this.setState({
                value: nextProps.minValue
            });
        }

        if (nextProps.maxValue < this.state.value) {
            this.setState({
                value: nextProps.maxValue
            });
        }
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextState.value !== this.state.value && typeof this.props.onChange === 'function') {
            this.props.onChange(this);
        }
    }

    /**
     * Decrease value
     */
    decreaseValue() {
        if (this.props.minValue === undefined || this.state.value > this.props.minValue) {
            this.setState({
                value: this.state.value - 1
            });
        }
    }

    /**
     * Increase value
     */
    increaseValue() {
        if (this.props.maxValue === undefined || this.state.value < this.props.maxValue) {
            this.setState({
                value: this.state.value + 1
            });
        }
    }

    render() {
        return (
            <span className="input-number">
                <input
                    className="input-number__input"
                    type="hidden"
                    name={this.props.name}
                    value={this.state.value}/>

                <button
                    className="input-number__control input-number__control_down"
                    onClick={this.decreaseValue}
                    disabled={this.state.value <= this.props.minValue}
                    type="button">Down</button>

                <span className="input-number__value">{this.state.value}</span>

                <button
                    className="input-number__control input-number__control_up"
                    onClick={this.increaseValue}
                    disabled={this.state.value >= this.props.maxValue}
                    type="button">Up</button>
            </span>
        );
    }
};
