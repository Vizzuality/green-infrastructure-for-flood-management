import React from 'react';
import upperFirst from 'lodash/upperFirst';
import uniq from 'lodash/uniq';
import { SvgIcon } from 'vizz-components';
import PlusNumber from 'components/ui/PlusNumber';
import { Link } from 'react-router';

export default function ProjectItem(props) {
  const data = props.data;
  const countries = uniq(data.locations.map(l => l.adm0_name));

  return (
    <Link to={`/map/project/${data.id}`} className="c-project-item">
      <div className="project-advance">
        <ul className="project-company">
          <li>
            {data.organizations.length && upperFirst(data.organizations[0].name)} {data.organizations.length > 1 && <PlusNumber list={data.organizations} className="-right" />}
          </li>
        </ul>
        <span className="project-name">{data.name}</span>
        <div className="project-tags-container">
          <p className="project-tags">
            <span className="title"  title="Nature Base Solutions">
              <SvgIcon name="icon-enter" className="-small" />
            </span>
            <span>
              {data.nature_based_solutions.length && upperFirst(data.nature_based_solutions[0].name)} {data.nature_based_solutions.length > 1 && <PlusNumber list={data.nature_based_solutions} className="-right" />}
            </span>
          </p>
          <p className="project-tags">
            <span className="title"  title="Hazards">
              <SvgIcon name="icon-flag" className="-small" />
            </span>
            <span>
              {data.hazard_types.length && upperFirst(data.hazard_types[0].name)} {data.hazard_types.length > 1 && <PlusNumber list={data.hazard_types} className="-right" />}
            </span>
          </p>
          <p className="project-tags">
            <span className="title" title="Countries">
              <SvgIcon name="icon-location" className="-small" />
            </span>
            <span>
              {countries.length && upperFirst(countries[0])} {countries.length > 1 && <PlusNumber list={countries} className="-right" />}
            </span>
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
