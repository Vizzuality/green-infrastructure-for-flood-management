import React from 'react';
import ProjectItem from './ProjectItem';

export default function ProjectList(props) {
  return (
    <ul className="c-project-list">
      {props.projects.map((project, i) => <li key={i}><ProjectItem onProjectSelect={props.onProjectSelect} data={project} /></li>)}
    </ul>
  );
}

ProjectList.propTypes = {
  projects: React.PropTypes.array.isRequired,
  onProjectSelect: React.PropTypes.func
};
ProjectList.defaultProps = {
  projects: []
};
