import React from 'react';
import classnames from 'classnames';

export default function OffCanvas({ children, opened, className, onClick }) {
  const cNames = classnames('c-off-canvas', {
    [className]: !!className,
    '-closed': !opened
  });

  return (
    <div className={cNames} onClick={onClick}>
      {children}
    </div>
  );
}

OffCanvas.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.any,
  opened: React.PropTypes.bool,
  onClick: React.PropTypes.func
};
