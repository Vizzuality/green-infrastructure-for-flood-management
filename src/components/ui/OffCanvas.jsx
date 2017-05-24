import React from 'react';
import classnames from 'classnames';

export default function OffCanvas({ children, opened, className }) {
  const cNames = classnames('c-off-canvas', {
    [className]: !!className,
    '-closed': !opened
  });

  return (
    <div className={cNames}>
      {children}
    </div>
  );
}

OffCanvas.propTypes = {
  className: React.PropTypes.string,
  opened: React.PropTypes.bool
};
