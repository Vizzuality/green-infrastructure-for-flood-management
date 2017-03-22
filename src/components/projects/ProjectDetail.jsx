import React from 'react';
import { SvgIcon } from 'vizz-components';

export default function ProjectDetail(props) {
  const { data } = props;

  return (
    <article className="c-project-detail">
      <div className="project-bar">
        <button className="project-back" onClick={props.onBack} type="button">
          <SvgIcon className="project-back-icon" name="icon-arrow-left-2" />
          See all projects
        </button>
      </div>
      <div className="project-detail-section">
        <h1 className="project-name">{data.name}</h1>
        <ul className="project-company">{data.organizations.map((org, i) => <li key={i}>{org.name}</li>)}</ul>
        <span className="project-date">{data.start_year} - {data.completion_year}</span>
        <p className="project-text">{data.summary}</p>
        <a className="project-link" rel="noopener noreferrer" target="_blank" href="http://www.worldbank.org/">Project page</a>
      </div>
      <div>
        <dl className="project-detail-list">
          <dt>Status</dt>
          <dd>On going</dd>
          <dt>Hazard</dt>
          <dd>{data.hazard_types.map((ht, i) => <span key={i}>{ht.name}</span>)}</dd>
          <dt>Intervention</dt>
          <dd>Hybrid - Hybrid measures utilize a combination of both grey and green measures to simultaneously establish immediate risk reduction while maintaining the valuable role of the relevant ecosystem</dd>
          <dt>Solution</dt>
          <dd>River restoration and Wetland restoration</dd>
          <dt>Co-benefits of intervention</dt>
          <dd>{data.co_benefits_of_interventions.map((c, i) => <span key={i}>{c.name}</span>)}</dd>
          <dt>Cost in million</dt>
          <dd className="-big">{data.estimated_cost} USD</dd>
          <dt>Benefits</dt>
          <dd>{data.estimated_monetary_benefits}</dd>
        </dl>
      </div>
    </article>
  );
}

ProjectDetail.propTypes = {
  data: React.PropTypes.object,
  onBack: React.PropTypes.func
};
