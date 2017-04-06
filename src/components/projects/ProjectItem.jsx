import React from 'react';
import { SvgIcon } from 'vizz-components';

export default function ProjectItem(props) {
  return (
    <div className="c-project-item" onClick={() => props.onProjectSelect(props.data.id)}>
      <div>
        <span className="project-name">{props.data.name}</span>
        <ul className="project-company">
          {props.data.organizations.map((org, i) => <li key={i}>{org.name}</li>)}
        </ul>
        <div className="project-tags-container row collapse">
          <p className="project-tags column small-12 medium-8">
            Solution: {props.data.primary_benefits_of_interventions.map((nat, i) => i !== props.data.primary_benefits_of_interventions.length-1 ? `${nat.name}, ` : nat.name)}
          </p>
          <p className="project-tags column small-12 medium-4">
            Hazard: {props.data.hazard_types.map((nat, i) => i !== props.data.hazard_types.length-1 ? `${nat.name}, ` : nat.name)}
          </p>
        </div>
      </div>
      <button className="project-action">
        <SvgIcon name="icon-arrow-right-2" className="-medium"></SvgIcon>
      </button>
    </div>
  );
}

ProjectItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  onProjectSelect: React.PropTypes.func
};
