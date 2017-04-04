import React from 'react';
import { SvgIcon } from 'vizz-components';
import classnames from 'classnames';
import TetherComponent from 'react-tether';

export default class SortBy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  setFilters(key, value) {
    this.setState({ isOpen: false }, () => {
      let filter = {};
      filter[key] = value;
      this.props.setProjectsFilters(filter);
    });
  }

  getLabel(value) {
    return this.props.list.filter(s => s.value === value)[0].label;
  }

  render () {
    const { isOpen } = this.state;
    const cNames = classnames(
      'c-sort-by',
      { [this.props.className]: !!this.props.className }
    );


    return (
      <div className={cNames}>
        <TetherComponent
          attachment="top center"
          constraints={[{
            to: 'window',
            attachment: 'together'
          }]}
          classes={{
            element: 'c-dropdown'
          }}
        >
          { /* First child: This is what the item will be tethered to */ }
          <button className="sort-header" onClick={() => {this.setState({isOpen: !isOpen})}}>
            <label>Sort by: </label>
            <span className="type">{this.getLabel(this.props.order)}</span>
          </button>
          { /* Second child: If present, this item will be tethered to the the first child */ }
          {
            isOpen &&
            <ul>
              {this.props.list.map((item, i) => <li key={i} onClick={() => this.setFilters('order', item.value)}>{item.label}</li>)}
            </ul>
          }
        </TetherComponent>
        
        <div className="arrows">
          <button onClick={() => this.setFilters('direction', 'asc')}>
            <SvgIcon name="icon-arrow-up-2" className={`-small ${this.props.direction === 'asc' ? '-active' : ''}`} />
          </button>
          <button onClick={() => this.setFilters('direction', 'desc')}>
            <SvgIcon name="icon-arrow-down-2" className={`-small ${this.props.direction === 'desc' ? '-active' : ''}`} />
          </button>
        </div>
      </div>
    );
  }
}

SortBy.propTypes = {
  order: React.PropTypes.string,
  direction: React.PropTypes.string,
  list: React.PropTypes.array,
  className: React.PropTypes.string
};
SortBy.defaultProps = {
  list: []
};
