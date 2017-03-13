import React from 'react';

export default function ProjectItem(props) {
  return (
    <div className="c-project-item">
      <span className="project-title">{props.data.title}</span>
      <span className="project-company">{props.data.company}</span>
      <ul className="project-tags">
        {props.data.tags.map((tag, i) => <li key={i}>{tag}</li>)}
      </ul>
    </div>
  );
}

ProjectItem.propTypes = {
  data: React.PropTypes.object.isRequired
};
