import React from 'react';
import upperFirst from 'lodash/upperFirst';
import { SvgIcon } from 'vizz-components';
import PlusNumber from 'components/ui/PlusNumber';
import { Link } from 'react-router';

export default function ProjectItem(props) {
  const data = props.data;
  return (
    <Link to={`/map/project/${data.id}`} className="c-project-item">
      <div className="project-advance">
        <span className="project-name">{data.name}</span>
        <ul className="project-company">
          <li>
            {data.organizations.length && upperFirst(data.organizations[0].name)} {data.organizations.length > 1 && <PlusNumber list={data.organizations} className="-right" />}
          </li>
        </ul>
        <div className="project-tags-container row collapse">
          <p className="project-tags column small-12 medium-8">
            <span className="title">Solution:</span><span> {data.nature_based_solutions.length && upperFirst(data.nature_based_solutions[0].name)} {data.nature_based_solutions.length > 1 && <PlusNumber list={data.nature_based_solutions} className="-right" />}</span>
          </p>
          <p className="project-tags column small-12 medium-4">
            <span className="title">Hazard: </span><span> {data.hazard_types.length && upperFirst(data.hazard_types[0].name)} {data.hazard_types.length > 1 && <PlusNumber list={data.hazard_types} className="-right" />}</span>
          </p>
        </div>
      </div>
      <button className="project-action">
        <SvgIcon name="icon-arrow-right-2" className="-medium" />
      </button>
    </Link>
  );
}

ProjectItem.propTypes = {
  data: React.PropTypes.object.isRequired
};
