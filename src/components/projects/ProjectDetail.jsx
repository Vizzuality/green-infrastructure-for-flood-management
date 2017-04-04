import React from 'react';
import { SvgIcon } from 'vizz-components';
import { Row } from 'components/ui/Grid';

export default function ProjectDetail(props) {
  const { data } = props;

  return (
    <article className="c-project-detail">
      <div className="project-bar">
        <button className="project-back" onClick={props.onBack} type="button">
          <SvgIcon className="project-back-icon" name="icon-arrow-left-2" />
          Project list
        </button>
      </div>
      <div className="project-detail-section">
        <ul className="project-company">{data.organizations.map((org, i) => <li key={i}>{org.name}</li>)}</ul>
        <span className="project-date">{data.start_year} - {data.completion_year}</span>
        <h1 className="project-name">{data.name}</h1>
      </div>
      <div className="project-resumme">
        <div className="project-cost">
          <Row>
            <div className="small-6">
              <span className="label">Monetary cost ( us$ Mildivons)</span>
              <span className="value -big">{data.estimated_cost}</span>
            </div>
            <div className="small-6">
              <span className="label">Monetary Benefits</span>
              <span className="value -big">{data.estimated_monetary_benefits}</span>
            </div>
          </Row>
        </div>
        <p className="project-text">{data.summary}</p>
        <a className="project-link" rel="noopener noreferrer" target="_blank" href="http://www.worldbank.org/">website</a>
      </div>
      <div className="project-info">
        <div className="project-info-item">
          <Row>
            <div className="small-4">
              <span className="label">Intervention</span>
              <span className="value">{data.intervention_type}</span>
            </div>
            <div className="small-4">
              <span className="label">Hazard</span>
              <span className="value">{data.hazard_types.map((ht, i) => <span className="value-item" key={i}>{ht.name}</span>)}</span>
            </div>
            <div className="small-4">
              <span className="label">Main donor</span>
              <span className="value">aaa</span>
            </div>
          </Row>
        </div>
        <div className="project-info-item">
          <span className="label">Benefits detail</span>
          <span className="value">{data.primary_benefits_of_interventions.map((pboi, i) => <span className="value-item" key={i}>{pboi.name}</span>)}</span>
        </div>

        <div className="project-info-item">
          <span className="label">Co-benefits of intervention</span>
          <span className="value">aaa</span>
        </div>

        <div className="project-info-item">
          <span className="label">Natured-based solution</span>
          <span className="value">{data.nature_based_solutions.map((nbs, i) => <span className="value-item" key={i}>{nbs.name}</span>)}</span>
        </div>

      </div>
    </article>
  );
}

ProjectDetail.propTypes = {
  data: React.PropTypes.object,
  onBack: React.PropTypes.func
};
