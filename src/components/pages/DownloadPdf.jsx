import React from 'react';
import upperFirst from 'lodash/upperFirst';
import { SvgIcon } from 'vizz-components';
import { Row } from 'components/ui/Grid';
import TetherComponent from 'react-tether';
import { Link } from 'react-router';
import isUrl from 'validator/lib/isURL';
import uniq from 'lodash/uniq';
import { setProjectsFilters } from 'modules/projects';
import { dispatch } from 'main';
import { push } from 'react-router-redux';

import { setNumberFormat, saveAsFile } from 'utils/general';

export default class DownloadPdf extends React.Component {
  componentWillMount() {
    this.props.setProjectsDetail(Number(this.props.params.id));
    (!this.props.projects || this.props.projects.length === 0) &&
      this.props.getProjects('');
  }

  componentDidUpdate(nextProps) {
    if (Object.keys(this.props.data).length) {
      window.print();
      window.history.back();
    }
  }

  setArrayProjectsFilter(id, key) {
    const filter = {};
    filter[key] = [`${id}`];
    dispatch(setProjectsFilters(filter));
    dispatch(push('/map'));
  }

  parseCost(millions) {
    return setNumberFormat(millions * 1000000);
  }

  render() {
    const { data } = this.props;
    const setArrayValues = (array, type) => array.map((pboi, i) => (
      <li
        className={`value-item ${type ? '-clickable' : ''}`}
        key={i}
        onClick={() => type && this.setArrayProjectsFilter(pboi.id, type)}
      >
        {upperFirst(pboi.name)}
      </li>
    ));
    const countries = data.locations ? uniq(data.locations.map(l => l.adm0_name)) : [];

console.log(data);
    return (
      <article className="c-project-detail">
        <div className="project-detail-section -print">
          <h1 className="project-name">{data.name}</h1>
          <span className="project-date">{`${data.start_year || 'unknown'} - ${data.completion_year || 'present'}`}</span>
          <div className="project-info-print">
            <ul className="project-company">{data.organizations && data.organizations.map((org, i) => <li key={i}>{org.name}</li>)}</ul>
            <ul className="project-country">{countries.map((c, i) => <li key={i}>{c && c}</li>)}</ul>
          </div>
        </div>
        <div className="project-resumme">
          <div className="project-cost">
            <Row>
              <div className="column small-12">
                <span className="label">Nature based solutions</span>
                <ul className="value -medium">{data.nature_based_solutions && setArrayValues(data.nature_based_solutions, 'nature_based_solutions')}</ul>
              </div>
            </Row>
          </div>

          <span className="label">Project summary</span>
          <p className="project-text -print">{data.summary}</p>
          <p className="project-link">{data.learn_more}</p>
        </div>
        <div className="project-info">
          <div className="project-info-item">
            <Row>
              {data.intervention_type && <div className="column small-4">
                <span className="label">Intervention</span>
                <span className="value">{upperFirst(data.intervention_type)}</span>
              </div>}
              {data.hazard_types && data.hazard_types.length > 0 && <div className="column small-4">
                <span className="label">Hazard</span>
                <ul className="value">{data.hazard_types && data.hazard_types.map((ht, i) => <li className="value-item" key={i}>{upperFirst(ht.name)}</li>)}</ul>
              </div>}
              {data.scale && <div className="column small-4">
                <span className="label">Scale</span>
                <span className="value">{upperFirst(data.scale)}</span>
              </div>}
            </Row>
          </div>

          {data.primary_benefits_of_interventions && data.primary_benefits_of_interventions.length > 0 && <div className="project-info-item">
            <span className="label">Risk reduction benefits</span>
            <ul className="value">{data.primary_benefits_of_interventions && setArrayValues(data.primary_benefits_of_interventions)}</ul>
          </div>}

          {data.co_benefits_of_interventions && data.co_benefits_of_interventions.length > 0 && <div className="project-info-item">
            <span className="label">Other benefits</span>
            <ul className="value">{data.co_benefits_of_interventions && setArrayValues(data.co_benefits_of_interventions)}</ul>
          </div>}

          {data.donors && data.donors.length > 0 && <div className="project-info-item">
            <span className="label">Main Donor</span>
            <span className="value">{data.donors && data.donors.length ? upperFirst(data.donors[0].name) : 'Unknown'}</span>
          </div>}

          <div className="project-info-item">
            <Row>
              <div className="property column small-6">
                <span className="label">
                  <span className="-sublabel">Est. Monetary Cost</span>
                </span>
                <span className="value -medium">{data.estimated_cost ? `${this.parseCost(data.estimated_cost)} US$` : 'Unknown'}</span>
              </div>
              <div className="property column small-6">
                <span className="label">Est. Monetary benefits</span>
                <span className="value -medium">{data.estimated_monetary_benefits ? `${this.parseCost(data.estimated_monetary_benefits)} US$` : 'Unknown'}</span>
              </div>
            </Row>
          </div>

          {data.benefit_details && <div className="project-info-item">
            <span className="label">Benefits detail</span>
            <span className="value">{data.benefit_details}</span>
          </div>}

          {data.learn_more && data.learn_more !== '' && <div className="project-info-item">
            <span className="label">Learn more</span>
            <span className="value">{isUrl(data.learn_more) ? <a className="link" href={data.learn_more}>{data.learn_more}</a> : data.learn_more}</span>
          </div>}

          {data.references && data.references !== '' && <div className="project-info-item">
            <span className="label">References</span>
            <span className="value">{isUrl(data.references) ? <a className="link" href={data.references}>{data.references}</a> : data.references}</span>
          </div>}
        </div>
      </article>
    );
  }
}

DownloadPdf.defaultProps = {
  data: {}
};

DownloadPdf.propTypes = {
  data: React.PropTypes.object,
  projects: React.PropTypes.array,
  getProjects: React.PropTypes.func,
  setProjectsDetail: React.PropTypes.func
};
