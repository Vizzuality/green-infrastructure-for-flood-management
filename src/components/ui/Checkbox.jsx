import React from 'react';
import { SvgIcon } from 'vizz-components';

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    // BINDINGS
    this.onChange = this.onChange.bind(this);
  }

  /**
   * UI EVENTS
   * - onChange
  */
  onChange(evt) {
    this.props.onChange && this.props.onChange({ value: this.props.value, checked: evt.currentTarget.checked });
  }

  render() {
    const { value, name, label, checked, className } = this.props;
    const cNames = ['c-checkbox'];
    if (className) {
      cNames.push(className);
    }

    return (
      <div className={cNames.join(' ')}>
        <input
          className="checkbox"
          type="checkbox"
          name={name}
          id={`checkbox-${name}-${value}`}
          value={value}
          checked={checked}
          onChange={this.onChange}
        />
        <label htmlFor={`checkbox-${name}-${value}`}>
          <span className="checkbox-icon">
            {/* <SvgIcon name="icon-checkbox" /> */}
          </span>
          <span className="item-title">{label}</span>
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  label: React.PropTypes.string,
  className: React.PropTypes.string,
  checked: React.PropTypes.bool,
  onChange: React.PropTypes.func
};
