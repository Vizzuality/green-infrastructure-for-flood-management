import React from 'react';

export default function ProjectItem(props) {
  return (
    <div className="c-project-item" onClick={() => props.onProjectSelect(props.data.id)}>
      <span className="project-name">{props.data.name}</span>
      <ul className="project-company">
        {props.data.organizations.map((org, i) => <li key={i}>{org.name}</li>)}
      </ul>
      <ul className="project-tags">
        {props.data.nature_based_solutions.map((nat, i) => <li key={i}>{nat.name}</li>)}
      </ul>
    </div>
  );
}

ProjectItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  onProjectSelect: React.PropTypes.func
};
