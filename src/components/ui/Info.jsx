import React from 'react';
import { SvgIcon } from 'vizz-components';

export default function Info({ text }) {
  return (
    <span className="c-info">
      <SvgIcon className="info-icon -smaller" name="icon-info" />
      <div className="c-dropdown -arrow-bottom">
        <p className="text">{text}</p>
      </div>
    </span>
  );
}

Info.propTypes = { text: React.PropTypes.string };
