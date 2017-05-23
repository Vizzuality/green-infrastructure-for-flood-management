import React from 'react';

export default function PlusNumber(props) {
  const number = props.number ? props.number : props.list.length - 1;

  return (
    <span className={`c-plus-number ${props.className}`}>
      <span>+{number}</span>
      {/*props.list.length ? 
        <span className="c-dropdown">
          <span className="tooltip-content">
            {props.list.map((l, i) => {
              return i !== 0 && <span key={i}>{l.name}{i < props.list.length - 1 ? ', ': ''}</span>
            })}
          </span>
        </span> :
      ''*/}
    </span>
  );
}
