import React from 'react';
import isEqual from 'lodash/isEqual';
import upperFirst from 'lodash/upperFirst';

export default class RadioGroup extends React.Component {

  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      checked: this.props.selected && this.props.selected.value
    };
    // BINDINGS
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.selected, this.props.selected)) {
      this.setState({
        checked: nextProps.selected && nextProps.selected.value
      });
    }
  }

  /**
   * UI EVENTS
   * - onChange
  */
  onChange(e) {
    // Send objects
    const newItem = e.currentTarget;
    this.setState({
      checked: newItem.value
    });
    this.props.onChange && this.props.onChange(newItem.value);
  }

  getRadios() {
    return this.props.options.map((option, i) => (
      <div className="radio-item" key={i}>
        <div className="icon-group">
          <input
            className="radio"
            type="radio"
            name={this.props.name || option.value}
            id={`radio-${option.value}`}
            value={option.value}
            checked={option.checked || option.value === this.state.checked }
            onChange={this.onChange}
          />
          <div className="icon-replace"></div>
        </div>
        <label className="label-title" htmlFor={`radio-${option.value}`}>
          {/* <span className="radio-icon">
            <SvgIcon name="icon-radio" />
          </span> */}
          <span className="item-title">{upperFirst(option.label)}</span>
        </label>
      </div>
      ));
  }

  render() {
    return (
      <div className={`c-radio-box ${this.props.className ? this.props.className : ''}`}>
        {this.props.title && <span className="radio-box-title">{this.props.title}</span>}
        {this.getRadios()}
      </div>
    );
  }
}

RadioGroup.propTypes = {
  name: React.PropTypes.string,
  title: React.PropTypes.string,
  selected: React.PropTypes.object,
  className: React.PropTypes.string,
  options: React.PropTypes.array,
  onChange: React.PropTypes.func
};
