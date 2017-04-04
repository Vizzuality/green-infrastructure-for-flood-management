import React from 'react';
import isEqual from 'lodash/isEqual';
import Checkbox from 'components/ui/Checkbox';

export default class CheckboxGroup extends React.Component {

  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      checked: this.props.selected.map(opt => opt.value || value) || []
    };
    // BINDINGS
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.selected, this.props.selected)) {
      this.setState({
        checked: nextProps.selected.map(opt => opt.value || opt)
      });
    }
  }

  /**
   * UI EVENTS
   * - onChange
  */
  onChange(newItem) {
    // Send objects
    const selectedObj = this.props.options.find(option => option.value === newItem.value);
    const newChecked = this.state.checked.slice(0);
    if (newItem.checked) {
      newChecked.push(selectedObj.value);
    } else {
      newChecked.splice(newChecked.indexOf(selectedObj.value), 1);
    }
    this.setState({
      checked: newChecked
    });
    this.props.onChange && this.props.onChange(newChecked);
  }

  getCheckbox() {
    return this.props.options.map((option, i) => (
      <Checkbox
        key={i}
        name={this.props.name}
        value={option.value}
        checked={this.state.checked.includes(option.value)}
        label={option.label}
        onChange={newSelected => this.onChange(newSelected)}
      />
      ));
  }

  render() {
    return (
      <div className={`c-checkbox-box ${this.props.className ? this.props.className : ''}`}>
        {this.props.title && <span className="checkbox-box-title">{this.props.title}</span>}
        {this.getCheckbox()}
      </div>
    );
  }
}

CheckboxGroup.propTypes = {
  name: React.PropTypes.string,
  title: React.PropTypes.string,
  selected: React.PropTypes.array,
  className: React.PropTypes.string,
  options: React.PropTypes.array,
  onChange: React.PropTypes.func
};