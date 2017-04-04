import React from 'react';
import { SvgIcon } from 'vizz-components';

export default function Search(props) {
  return (
    <div className="c-search">
      <input
        className="search-input"
        type="search"
        placeholder={props.placeholder || 'Search'}
        {...props}
      />
      <SvgIcon className="search-icon" name="icon-search" />
    </div>
  );
}
