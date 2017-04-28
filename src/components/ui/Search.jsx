import React from 'react';
import { SvgIcon } from 'vizz-components';

export default class Search extends React.Component {

  /* Lifecycle */
  componentWillReceiveProps(newProps) {
    newProps.focus && this.input.focus();
  }

  /* Methods */
  clear() {
    this.input.value = '';
    this.props.onClear && this.props.onClear();
  }

  /* Render */
  render() {
    const { focus, placeholder, onClear, ...props } = this.props;
    return (
      <div className="c-search">
        <SvgIcon className="search-icon" name="icon-search" />
        <input
          ref={node => this.input = node}
          className="search-input"
          type="search"
          placeholder={placeholder || 'Search'}
          {...props}
        />
        {props.close && <button onClick={() => this.clear()} className="clear-btn">
          <SvgIcon className="clear-icon" name="icon-cross" />
        </button>}
      </div>
    );
  }
}

Search.propTypes = {
  focus: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  onClear: React.PropTypes.func
};
