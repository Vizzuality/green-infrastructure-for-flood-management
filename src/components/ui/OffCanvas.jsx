import React from 'react';
import classnames from 'classnames';

export default function OffCanvas({ children, opened }) {
  const cNames = classnames('c-off-canvas', {
    '-closed': !opened
  });

  return (
    <div className={cNames}>
      {children}
    </div>
  );
}

OffCanvas.propTypes = {
  opened: React.PropTypes.bool
};
