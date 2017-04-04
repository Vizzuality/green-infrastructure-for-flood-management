import React from 'react';
import { SvgIcon } from 'vizz-components';
import { Row } from 'components/ui/Grid';

export default function ProjectDetail(props) {
  const { data } = props;
  const setArrayValues = array => array.map((pboi, i) => <span className="value-item" key={i}>{pboi.name}</span>);

  return (
    <article className="c-project-detail">
      <div className="project-bar">
        <button className="project-back" onClick={props.onBack} type="button">
          <SvgIcon className="project-back-icon" name="icon-arrow-left-2" />
          Project list
        </button>
        <div className="project-actions">
          <button className="action" type="button">
            <SvgIcon className="project-share-icon -medium" name="icon-share" />
            Share
          </button>

          <button className="action" type="button">
            <SvgIcon className="project-download-icon -medium" name="icon-download-white" />
            Download
          </button>
        </div>
      </div>
      <div className="project-detail-section">
        <ul className="project-company">{data.organizations.map((org, i) => <li key={i}>{org.name}</li>)}</ul>
        <span className="project-date">{data.start_year} - {data.completion_year}</span>
        <h1 className="project-name">{data.name}</h1>
      </div>
      <div className="project-resumme">
        <div className="project-cost">
          <Row>
            <div className="small-12">
              <span className="label">Nature based solutions</span>
              <span className="value -big">{setArrayValues(data.nature_based_solutions)}</span>
            </div>
          </Row>
        </div>

        <span className="label">Project resume</span>
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
              <span className="label">Scale</span>
              <span className="value">{data.scale}</span>
            </div>
          </Row>
        </div>

        {data.primary_benefits_of_interventions.length && <div className="project-info-item">
          <span className="label">Primary benefits of intervention</span>
          <span className="value">{setArrayValues(data.primary_benefits_of_interventions)}</span>
        </div>}

        {data.co_benefits_of_interventions.length && <div className="project-info-item">
          <span className="label">Co-benefits of intervention</span>
          <span className="value">{setArrayValues(data.co_benefits_of_interventions)}</span>
        </div>}
        
        <div className="project-info-item">
          <span className="label">Main Donor</span>
          <span className="value">{data.donors.length ? data.donor[0].name : 'Unknown'}</span>
        </div>

        <div className="project-info-item">
          <Row>
            <div className="small-6">
              <span className="label">Est. Monetary Cost (Today's US$)</span>
              <span className="value -big">{data.estimated_cost} US$</span>
            </div>
            <div className="small-6">
              <span className="label">Est. Monetary benefits</span>
              <span className="value -big">{data.estimated_monetary_benefits} US$</span>
            </div>
          </Row>
        </div>

        {data.benefit_details && <div className="project-info-item">
          <span className="label">Benefits detail</span>
          <span className="value">{data.benefit_details}</span>
        </div>}

        {data.learn_more !== '' && <div className="project-info-item">
          <span className="label">Learn more</span>
          <span className="value">{data.learn_more}</span>
        </div>}

        {data.references !== '' && <div className="project-info-item">
          <span className="label">References</span>
          <span className="value">{data.references}</span>
        </div>}


      </div>
    </article>
  );
}

ProjectDetail.propTypes = {
  data: React.PropTypes.object,
  onBack: React.PropTypes.func
};
