import React from 'react';

function Row(props) {
  return <div className="row expanded collapse">{props.children}</div>;
}

export { Row };
