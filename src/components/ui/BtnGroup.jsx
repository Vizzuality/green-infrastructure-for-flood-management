import React from 'react';

export default function BtnGroup({ children }) {
  return (
    <ul className="c-btn-group">
      {children.map((btn, i) => <li className="btn-group-item" key={i}>{btn}</li>)}
    </ul>
  );
}
