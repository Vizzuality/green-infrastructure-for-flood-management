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

    // Bindings
    this.toggleDataDropdown = this.toggleDataDropdown.bind(this);
    this.onScreenClick = this.onScreenClick.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onScreenClick);
  }

  onScreenClick(e) {
    const el = document.querySelector('.c-dropdown');
    const clickOutside = el && el.contains && !el.contains(e.target);
    const isSortBtn = this.sortByBtn.contains(e.target);

    if (clickOutside) {
      (!isSortBtn) ? this.toggleDataDropdown(e, 'isOpen', true) : null;
    }
  }

  toggleDataDropdown(e, specificDropdown, to) {
    const { isOpen } = this.state;

    this.setState({ isOpen: to ? false : !isOpen });

    requestAnimationFrame(() => {
      window[!this.state[specificDropdown] ?
        'removeEventListener' : 'addEventListener']('click', this.onScreenClick, true);
    });
  }

  setFilters(key, value) {
    this.setState({ isOpen: false }, () => {
      const filter = {};
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
            to: 'scrollParent',
            attachment: 'together'
          }]}
          classes={{
            element: 'c-dropdown -sortby'
          }}
        >
          { /* First child: This is what the item will be tethered to */ }
          <button
            className="sort-header"
            ref={co => this.sortByBtn = co}
            onClick={(e) => this.toggleDataDropdown(e, 'isOpen')}
          >
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
  className: React.PropTypes.string,
  setProjectsFilters: React.PropTypes.func
};

SortBy.defaultProps = {
  list: []
};
