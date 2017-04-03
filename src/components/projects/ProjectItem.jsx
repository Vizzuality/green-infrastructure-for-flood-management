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
        <div className="project-tags-container">
          <p className="project-tags">Intervention: {props.data.intervention_type}</p>
          <p className="project-tags">
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
