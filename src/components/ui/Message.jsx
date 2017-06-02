import React from 'react';
import classnames from 'classnames';

export default function Message(props) {
  const classNames = classnames(
    'c-message',
    { [`-${props.type}`]: !!props.type }
  );

  return (
    <div className={classNames}>
      <p className="text">{props.message}</p>
    </div>
  );
}

Message.propTypes = {
  message: React.PropTypes.string,
  type: React.PropTypes.string
};
