import React from 'react';
import ProjectItem from './ProjectItem';

export default function ProjectList(props) {
  return (
    <ul className="c-project-list">
      {props.projects.map((project, i) => <li key={i}><ProjectItem data={project} /></li>)}
    </ul>
  );
}

ProjectList.propTypes = {
  projects: React.PropTypes.array.isRequired
};
ProjectList.propValues = {
  projects: []
};
