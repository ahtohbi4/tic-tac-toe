import React, {Component} from 'react';

export default class Radio extends Component {
    render() {
        return (
            <div className="radio">{this.props.items.map((item, i) => {
                return (
                    <RadioItem name={this.props.name} value={item.value} label={item.label || item.value} key={i}/>
                );
            })}</div>
        );
    }
}

export class RadioItem extends Component {
    render() {
        return (
            <label className="radio__item">
                <input className="radio__input" name={this.props.name} value={this.props.value} type="radio"/>
                <div className="radio__label">{this.props.label}</div>
            </label>
        );
    }
}
