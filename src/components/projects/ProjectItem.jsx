import React from 'react';

export default function ProjectItem(props) {
  return (
    <div className="c-project-item">
      <span>{props.data.title}</span>
      <span>{props.data.company}</span>
      <ul>
        {props.data.tags.map((tag, i) => <li key={i}>{tag}</li>)}
      </ul>
    </div>
  );
}

ProjectItem.propTypes = {
  data: React.PropTypes.object.isRequired
};
