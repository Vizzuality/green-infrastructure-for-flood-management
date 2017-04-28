import React from 'react';
import { push } from 'react-router-redux';
import upperFirst from 'lodash/upperFirst';
import uniq from 'lodash/uniq';
import { SvgIcon } from 'vizz-components';
import TetherComponent from 'react-tether';
import { Link } from 'react-router';
import isUrl from 'validator/lib/isURL';
import { Row } from 'components/ui/Grid';
import { setNumberFormat, saveAsFile } from 'utils/general';
// Modules
import { setProjectsFilters } from 'modules/projects';
import { dispatch } from 'main';

export default class ProjectDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      organizationsOpen: false,
      countriesOpen: false,
      summaryOpen: false
    };

    // BINDINGS
    this.toggleDataDropdown = this.toggleDataDropdown.bind(this);
    this.onScreenClick = this.onScreenClick.bind(this);
    this.onShowSummary = this.onShowSummary.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onScreenClick);
  }

  onScreenClick(e) {
    const el = document.querySelector('.c-dropdown');
    const clickOutside = el && el.contains && !el.contains(e.target);
    const isOrganizationsBtn = this.organizationsBtn && this.organizationsBtn.contains(e.target);
    const isCountriesBtn = this.countriesBtn && this.countriesBtn.contains(e.target);

    if (clickOutside) {
      (!isOrganizationsBtn) ? this.toggleDataDropdown(e, 'organizationsOpen', true) : null;
      (!isCountriesBtn) ? this.toggleDataDropdown(e, 'countriesOpen', true) : null;
    }
  }

  onShowSummary() {
    this.setState({ summaryOpen: !this.state.summaryOpen });
  }

  setArrayProjectsFilter(id, key) {
    const filter = {};
    filter[key] = [`${id}`];
    dispatch(setProjectsFilters(filter));
    dispatch(push('/map'));
  }

  toggleDataDropdown(e, specificDropdown, to) {
    const { organizationsOpen, countriesOpen } = this.state;

    if (specificDropdown === 'organizationsOpen') {
      this.setState({
        organizationsOpen: to ? false : !organizationsOpen,
        countriesOpen: false
      });
    } else {
      this.setState({
        countriesOpen: to ? false : !countriesOpen,
        organizationsOpen: false
      });
    }

    requestAnimationFrame(() => {
      window[!this.state[specificDropdown] ?
        'removeEventListener' : 'addEventListener']('click', this.onScreenClick, true);
    });
  }

  parseCost(millions) {
    return setNumberFormat(millions * 1000000);
  }

  render() {
    const { data } = this.props;
    const { organizationsOpen, countriesOpen } = this.state;
    const setArrayValues = (array, type) => array.map((pboi, i) => (
      <li
        className={`value-item ${type ? '-clickable' : ''}`}
        key={i}
        onClick={() => type && this.setArrayProjectsFilter(pboi.id, type)}
      >
        {upperFirst(pboi.name)}
      </li>
    ));
    const countries = uniq(data.locations.map(l => l.adm0_name));

    return (
      <article className="c-project-detail">
        <div className="project-bar">
          <Link to="/map" className="project-back">
            <SvgIcon className="project-back-icon" name="icon-arrow-left-2" />
            Project list
          </Link>
          <div className="project-actions">
            <button
              className="c-btn -transparent action"
              type="button"
              onClick={() => saveAsFile('http://nature-of-risk-reduction.vizzuality.com/downloads/project', 'projectDetail.pdf')}
            >
              Download PDF
            </button>
          </div>
        </div>
        <div className="project-detail-section">
          {data.organizations.length === 1 ?
            <p className="project-company">{data.organizations[0].name}</p> :
            <TetherComponent
              attachment="top left"
              targetAttachment="bottom left"
              constraints={[{
                to: 'scrollParent',
                attachment: 'together',
                pin: true
              }]}
              classes={{
                element: 'c-dropdown -arrow-left'
              }}
            >
              { /* First child: This is what the item will be tethered to */ }
              <p className="project-company -drop" type="button" onClick={e => this.toggleDataDropdown(e, 'organizationsOpen')} ref={c => this.organizationsBtn = c}>
                {data.organizations.length} organizations
              </p>
              { /* Second child: If present, this item will be tethered to the the first child */ }
              {
                organizationsOpen &&
                <div>
                  <ul className="info">
                    {data.organizations.map((org, i) => <li key={i}>{org.name}</li>)}
                  </ul>
                </div>
              }
            </TetherComponent>
          }

          <div className="pair-data">
            <span className="project-data">{`${data.start_year || 'unknown'} - ${data.completion_year || 'present'}`}</span>
            <span className="project-data">{data.country}</span>
            {countries.length === 1 ?
              <span className="project-data">{countries[0]}</span> :
              <TetherComponent
                attachment="top right"
                targetAttachment="bottom right"
                constraints={[{
                  to: 'scrollParent',
                  attachment: 'together',
                  pin: true
                }]}
                classes={{
                  element: 'c-dropdown -arrow-left'
                }}
              >
                { /* First child: This is what the item will be tethered to */ }
                <p className="project-country -drop" type="button" onClick={e => this.toggleDataDropdown(e, 'countriesOpen')} ref={c => this.countriesBtn = c}>
                  {countries.length} countries
                </p>
                { /* Second child: If present, this item will be tethered to the the first child */ }
                {
                  countriesOpen &&
                  <div>
                    <ul className="info">
                      {countries.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                }
              </TetherComponent>
            }
          </div>
          <h1 className={`project-name ${data.name.length > 40 ? '-small' : ''}`}>{data.name}</h1>
        </div>
        <div className="project-resumme">
          <div className="project-cost">
            <Row>
              <div className="column small-12">
                <span className="label -info">
                  Nature based solutions
                  <span className="info">
                    <SvgIcon className="info-icon -smaller" name="icon-info" />
                    <div className="c-dropdown -arrow-bottom">
                      <p className="text">Explanation text lorem ipsum id casius nibh uricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper nulla non metus auctor fringilla. Nullam quis risus eget urna.</p>
                    </div>
                  </span>
                </span>
                <ul className="value -big">{setArrayValues(data.nature_based_solutions, 'nature_based_solutions')}</ul>
              </div>
            </Row>
          </div>

          <span className="label">Project summary</span>
          <div className={`project-summary ${this.state.summaryOpen ? '-open' : ''}`}>
            <p className="project-text">{data.summary}</p>
            {!this.state.summaryOpen && <button className="more" onClick={this.onShowSummary}>
              <SvgIcon className="more-icon -medium" name="icon-arrow-down-2" />
            </button>}
          </div>
          <a className="project-link" rel="noopener noreferrer" target="_blank" href={data.learn_more}>Project website</a>
        </div>
        <div className="project-info">
          <div className="project-info-item">
            <Row>
              {data.intervention_type && <div className="column small-4">
                <span className="label">Intervention</span>
                <span className="value">{upperFirst(data.intervention_type)}</span>
              </div>}
              {data.hazard_types.length > 0 && <div className="column small-4">
                <span className="label">Hazard</span>
                <ul className="value">{data.hazard_types.map((ht, i) => <li className="value-item" key={i}>{upperFirst(ht.name)}</li>)}</ul>
              </div>}
              {data.scale && <div className="column small-4">
                <span className="label">Scale</span>
                <span className="value">{upperFirst(data.scale)}</span>
              </div>}
            </Row>
          </div>

          {data.primary_benefits_of_interventions.length > 0 && <div className="project-info-item">
            <span className="label">Risk reduction benefits</span>
            <ul className="value">{setArrayValues(data.primary_benefits_of_interventions)}</ul>
          </div>}

          {data.co_benefits_of_interventions.length > 0 && <div className="project-info-item">
            <span className="label">Co-benefits of intervention</span>
            <ul className="value">{setArrayValues(data.co_benefits_of_interventions)}</ul>
          </div>}

          {data.donors.length > 0 && <div className="project-info-item">
            <span className="label">Main Donor</span>
            <span className="value">{data.donors.length ? upperFirst(data.donors[0].name) : 'Unknown'}</span>
          </div>}

          <div className="project-info-item">
            <Row>
              <div className="property column small-6">
                <span className="label">
                  <span>Est. Monetary Cost</span>
                  <span className="sublabel">(Today's US$)</span>
                </span>
                <span className="value -big">{data.estimated_cost ? `${this.parseCost(data.estimated_cost)} US$` : 'Unknown'}</span>
              </div>
              <div className="property column small-6">
                <span className="label">Est. Monetary benefits</span>
                <span className="value -big">{data.estimated_monetary_benefits ? `${this.parseCost(data.estimated_monetary_benefits)} US$` : 'Unknown'}</span>
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

ProjectDetail.propTypes = {
  data: React.PropTypes.object
};
