import React from 'react';

function Row(props) {
  return <div className={`row expanded out-collapse ${props.className ? props.className : ''}`}>{props.children}</div>;
}

Row.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.any
};

export { Row };
