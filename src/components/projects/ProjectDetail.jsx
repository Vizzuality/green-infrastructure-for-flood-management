import React from 'react';
import { SvgIcon } from 'vizz-components';
import { Row } from 'components/ui/Grid';
import TetherComponent from 'react-tether';
import { Link } from 'react-router';
// import isUrl from 'validator/lib/isUrl';

import { setNumberFormat, saveAsFile } from 'utils/general';

export default class ProjectDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shareOpen: false,
      downloadOpen: false
    };

    // BINDINGS
    this.toggleDataDropdown = this.toggleDataDropdown.bind(this);
    this.onScreenClick = this.onScreenClick.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onScreenClick);
  }

  onScreenClick(e) {
    const el = document.querySelector('.c-dropdown');
    const clickOutside = el && el.contains && !el.contains(e.target);
    const isShareBtn = this.shareBtn.contains(e.target);
    const isDownloadBtn = this.downloadBtn.contains(e.target);

    if (clickOutside) {
      (!isShareBtn) ? this.toggleDataDropdown(e, 'shareOpen', true) : null;
      (!isDownloadBtn) ? this.toggleDataDropdown(e, 'downloadOpen', true) : null;
    }
  }

  toggleDataDropdown(e, specificDropdown, to) {
    const { shareOpen, downloadOpen } = this.state;

    if (specificDropdown === 'shareOpen') {
      this.setState({
        shareOpen: to ? false : !shareOpen,
        downloadOpen: false
      });
    } else {
      this.setState({
        downloadOpen: to ? false : !downloadOpen,
        shareOpen: false
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
    const { shareOpen, downloadOpen } = this.state;
    const setArrayValues = array => array.map((pboi, i) => <span className="value-item" key={i}>{pboi.name}</span>);


    return (
      <article className="c-project-detail">
        <div className="project-bar">
          <Link to="/map" className="project-back">
            <SvgIcon className="project-back-icon" name="icon-arrow-left-2" />
            Project list
          </Link>
          <div className="project-actions">
            <TetherComponent
              attachment="top center"
              constraints={[{
                to: 'scrollParent',
                attachment: 'together'
              }]}
              classes={{
                element: 'c-dropdown'
              }}
            >
              { /* First child: This is what the item will be tethered to */ }
              <button className="action" type="button" onClick={(e) => this.toggleDataDropdown(e, 'shareOpen')} ref={c => this.shareBtn = c}>
                <SvgIcon className="project-share-icon -medium" name="icon-share" />
                Share
              </button>
              { /* Second child: If present, this item will be tethered to the the first child */ }
              {
                shareOpen &&
                <div>
                  <p>Not available</p>
                </div>
              }
            </TetherComponent>

            <button
              className="action"
              type="button"
              onClick={() => saveAsFile('http://nature-of-risk-reduction.vizzuality.com/downloads/project', 'projectDetail.pdf')}
            >
              <SvgIcon className="project-download-icon -medium" name="icon-download-white" />
              Download PDF
            </button>
          </div>
        </div>
        <div className="project-detail-section">
          <ul className="project-company">{data.organizations.map((org, i) => <li key={i}>{org.name}</li>)}</ul>
          <span className="project-date">{`${data.start_year} - ${data.completion_year || 'present'}`}</span>
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
          <a className="project-link" rel="noopener noreferrer" target="_blank" href={data.learn_more}>website</a>
        </div>
        <div className="project-info">
          <div className="project-info-item">
            <Row>
              {data.intervention_type && <div className="small-4">
                <span className="label">Intervention</span>
                <span className="value">{data.intervention_type}</span>
              </div>}
              {data.hazard_types.length ? <div className="small-4">
                <span className="label">Hazard</span>
                <span className="value">{data.hazard_types.map((ht, i) => <span className="value-item" key={i}>{ht.name}</span>)}</span>
              </div> : ''}
              {data.scale && <div className="small-4">
                <span className="label">Scale</span>
                <span className="value">{data.scale}</span>
              </div>}
            </Row>
          </div>

          {data.primary_benefits_of_interventions.length && <div className="project-info-item">
            <span className="label">Risk reduction benefits</span>
            <span className="value">{setArrayValues(data.primary_benefits_of_interventions)}</span>
          </div>}

          {data.co_benefits_of_interventions.length && <div className="project-info-item">
            <span className="label">Co-benefits of intervention</span>
            <span className="value">{setArrayValues(data.co_benefits_of_interventions)}</span>
          </div>}

          {data.donors.length ? <div className="project-info-item">
            <span className="label">Main Donor</span>
            <span className="value">{data.donors.length ? data.donors[0].name : 'Unknown'}</span>
          </div> : ''}

          <div className="project-info-item">
            <Row>
              <div className="property small-6">
                <span className="label">
                  <span>Est. Monetary Cost</span>
                  <span className="sublabel">(Today's US$)</span>
                </span>
                <span className="value -big">{data.estimated_cost ? `${this.parseCost(data.estimated_cost)} US$` : 'Unknown'}</span>
              </div>
              <div className="property small-6">
                <span className="label">Est. Monetary benefits</span>
                <span className="value -big">{data.estimated_monetary_benefits ? `${this.parseCost(data.estimated_monetary_benefits)} US$` : 'Unknown'}</span>
              </div>
            </Row>
          </div>

          {data.benefit_details && <div className="project-info-item">
            <span className="label">Benefits detail</span>
            <span className="value">{data.benefit_details}</span>
          </div>}

          {/*data.learn_more && data.learn_more !== '' && <div className="project-info-item">
            <span className="label">Learn more</span>
            <span className="value">{isUrl(data.learn_more) ? <a className="link" href={data.learn_more}>{data.learn_more}</a> : data.learn_more}</span>
          </div>*/}

          {/*data.references && data.references !== '' && <div className="project-info-item">
            <span className="label">References</span>
            <span className="value">{isUrl(data.references) ? <a className="link" href={data.references}>{data.references}</a> : data.references}</span>
          </div>*/}
        </div>
      </article>
    );
  }
}

ProjectDetail.propTypes = {
  data: React.PropTypes.object
};
