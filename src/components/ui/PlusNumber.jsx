import React from 'react';

export default function PlusNumber(props) {
  const number = props.number ? props.number : props.list.length - 1;

  return (
    <span className={`c-plus-number ${props.className}`}>+{number}</span>
  );
}
