import React, {Component, PropTypes} from 'react';

/**
 * @class
 * @extends Component
 *
 * @props {string} name
 * @props {number} [value=0]
 * @props {number} [minValue]
 * @props {number} [maxValue]
 */
export default class InputNumber extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value || 0,
            minValue: props.minValue,
            maxValue: props.maxValue
        };

        this.decreaseValue = this.decreaseValue.bind(this);
        this.increaseValue = this.increaseValue.bind(this);
    }

    static propTypes = {
        minValue: PropTypes.number,
        maxValue: PropTypes.number
    }

    decreaseValue() {
        if (this.state.minValue === undefined || this.state.value > this.state.minValue) {
            this.setState({
                value: this.state.value - 1
            });
        }
    }

    increaseValue() {
        if (this.state.maxValue === undefined || this.state.value < this.state.maxValue) {
            this.setState({
                value: this.state.value + 1
            });
        }
    }

    render() {
        return (
            <span className="input-number">
                <input className="input-number__input" type="hidden" name={this.props.name} value={this.state.value}/>

                <button className="input-number__control input-number__control_down" onClick={this.decreaseValue} disabled={this.state.value <= this.state.minValue} type="button">Down</button>

                <span className="input-number__value">{this.state.value}</span>

                <button className="input-number__control input-number__control_up" onClick={this.increaseValue} disabled={this.state.value >= this.state.maxValue} type="button">Up</button>
            </span>
        );
    }
};
