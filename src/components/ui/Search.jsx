import React from 'react';
import { SvgIcon } from 'vizz-components';

export default class Search extends React.Component {

  componentWillReceiveProps(newProps) {
    newProps.focus && this.input.focus();
  }

  render() {
    const { focus, placeholder, ...props } = this.props;
    return (
      <div className="c-search">
        <input
          ref={node => this.input = node}
          className="search-input"
          type="search"
          placeholder={placeholder || 'Search'}
          {...props}
        />
        <SvgIcon className="search-icon" name="icon-search" />
      </div>
    );
  }
}

Search.propTypes = {
  focus: React.PropTypes.bool,
  placeholder: React.PropTypes.string
};
