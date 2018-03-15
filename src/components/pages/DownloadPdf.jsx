import React from 'react';
import { dispatch } from 'main';
import { push, replace } from 'react-router-redux';

import upperFirst from 'lodash/upperFirst';
import isUrl from 'validator/lib/isURL';
import uniq from 'lodash/uniq';
import isEqual from 'lodash/isEqual';

import { getMarkers } from 'utils/cluster';
import { setProjectsFilters } from 'modules/projects';
import { setNumberFormat, saveAsFile } from 'utils/general';

import { SvgIcon } from 'vizz-components';
import { Row } from 'components/ui/Grid';
import TetherComponent from 'react-tether';
import { Link } from 'react-router';
import Map from 'components/map/Map';
import Spinner from 'components/ui/Spinner';


export default class DownloadPdf extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: getMarkers(props),
      mapMethods: this.getMapMethods(props),
      loading: true
    };
  }

  componentWillMount() {
    this.props.setProjectsDetail(+this.props.params.id);
    (!this.props.projects || this.props.projects.length === 0) &&
      this.props.getProjects('');
  }

  componentDidUpdate(nextProps) {
    if (Object.keys(this.props.projectDetail).length && !this.state.loading) {
      setTimeout(() => {
        this.download(nextProps);
      }, 2500);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!isEqual(this.props.projectDetail, newProps.projectDetail)) {
      this.setState({
        markers: getMarkers(newProps),
        mapMethods: this.getMapMethods(newProps),
        loading: false
      });
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

  /* Map methods */
  getMapOptions() {
    /* Map options */
    return {
      zoom: this.props.mapState.zoom,
      zoomControl: false,
      center: [this.props.mapState.latLng.lat, this.props.mapState.latLng.lng],
      scrollWheelZoom: false,
      dragging: false
    };
  }

  getMapMethods(props) {
    const tileLayers = [
      {
        id: 'basemapBase',
        url: config.BASEMAP_TILE_URL,
        zIndex: 0
      },
      {
        id: 'layer1',
        url: config.LAYER_URL,
        zIndex: props.mapState.layersActive.includes('layer1') ? 1 : -1,
        options: {
          tms: true
        }
      }
    ];

    if (config.BASEMAP_LABELS_URL && config.BASEMAP_LABELS_URL !== '') {
      tileLayers.push({
        id: 'basemapLabels',
        url: config.BASEMAP_LABELS_URL,
        zIndex: 2
      });
    }

    /* Map methods */
    const methods = {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      tileLayers
    };

    let points = [];

    if (props.projectDetail && props.projectDetail.locations && props.projectDetail.locations.length) {
      // If we are in project detail, bounds are the project detail locations
      points = props.projectDetail.locations.map(p => [p.centroid.coordinates[1], p.centroid.coordinates[0]]);
    } else {
      // If we are in global view, bounds are all project locations
      props.projects.forEach((project) => {
        points.push(project.locations.map(p => [p.centroid.coordinates[1], p.centroid.coordinates[0]]));
      });
    }

    if (points.length) {
      const bounds = L.latLngBounds(points);
      methods.fitBounds = {
        bounds,
        options: {
          paddingTopLeft: [0, 0],
          paddingBottomRight: [0, 0],
          maxZoom: 8
        }
      };
    }

    return methods;
  }

  download(nextProps) {
    const project = nextProps.projects.find(p => `${p.id}` === `${nextProps.params.id}`);
    const slug = project ? project.slug : nextProps.params.id;

    window.print();
    dispatch(replace(`/map/project/${slug}`));
  }

  render() {
    const { markers, mapMethods } = this.state;
    const { projectDetail } = this.props;
    const setArrayValues = (array, type) => array.map((pboi, i) => (
      <li
        className={`value-item ${type ? '-clickable' : ''}`}
        key={i}
        onClick={() => type && this.setArrayProjectsFilter(pboi.id, type)}
      >
        {upperFirst(pboi.name)}
      </li>
    ));
    const countries = projectDetail.locations ? uniq(projectDetail.locations.map(l => l.adm0_name)) : [];
    const mapOptions = this.getMapOptions();
    const mapParams = { mapMethods, mapOptions, markers };

    return (
      <article className="c-project-detail -print">
        <Spinner isLoading={this.state.loading} />
        <div className="project-detail-section -print">
          <h1 className="project-name">{projectDetail.name}</h1>
          <span className="project-date">{`${projectDetail.start_year || 'unknown'} - ${projectDetail.completion_year || 'present'}`}</span>
          <div className="project-info-print">
            <ul className="project-company">
              {projectDetail.organizations && projectDetail.organizations.map((org, i) => <li key={i}>{org.name}</li>)}
            </ul>
            <ul className="project-country">{countries.map((c, i) => <li key={i}>{c && c}</li>)}</ul>
          </div>
        </div>
        <div className="project-resumme">
          <div className="project-cost">
            <Row>
              <div className="column small-12">
                <span className="label">Nature based solutions</span>
                <ul className="value -medium">{projectDetail.nature_based_solutions && setArrayValues(projectDetail.nature_based_solutions, 'nature_based_solutions')}</ul>
              </div>
            </Row>
          </div>

          <span className="label">Project summary</span>
          <p className="project-text -print" dangerouslySetInnerHTML={{ __html: projectDetail.summary }}></p>
          {projectDetail.learn_more && projectDetail.learn_more !== '' &&
            <p className="project-link">{projectDetail.learn_more}</p>
          }
        </div>
        <div className="project-info">
          <div className="project-info-item">
            <Row>
              {projectDetail.intervention_type && <div className="column small-4">
                <span className="label">Intervention</span>
                <span className="value">{upperFirst(projectDetail.intervention_type)}</span>
              </div>}
              {projectDetail.hazard_types && projectDetail.hazard_types.length > 0 && <div className="column small-4">
                <span className="label">Hazard</span>
                <ul className="value">{projectDetail.hazard_types && projectDetail.hazard_types.map((ht, i) => <li className="value-item" key={i}>{upperFirst(ht.name)}</li>)}</ul>
              </div>}
              {projectDetail.scale && <div className="column small-4">
                <span className="label">Scale</span>
                <span className="value">{upperFirst(projectDetail.scale)}</span>
              </div>}
            </Row>
          </div>

          {projectDetail.primary_benefits_of_interventions && projectDetail.primary_benefits_of_interventions.length > 0 && <div className="project-info-item">
            <span className="label">Risk reduction benefits</span>
            <ul className="value">{projectDetail.primary_benefits_of_interventions && setArrayValues(projectDetail.primary_benefits_of_interventions)}</ul>
          </div>}

          {projectDetail.co_benefits_of_interventions && projectDetail.co_benefits_of_interventions.length > 0 && <div className="project-info-item">
            <span className="label">Other benefits</span>
            <ul className="value">{projectDetail.co_benefits_of_interventions && setArrayValues(projectDetail.co_benefits_of_interventions)}</ul>
          </div>}

          {projectDetail.donors && projectDetail.donors.length > 0 && <div className="project-info-item">
            <span className="label">Main Donor</span>
            <span className="value">{projectDetail.donors && projectDetail.donors.length ? upperFirst(projectDetail.donors[0].name) : 'Unknown'}</span>
          </div>}

          <div className="project-info-item">
            <Row>
              <div className="property column small-6">
                <span className="label">
                  <span className="-sublabel">Est. Monetary Cost</span>
                </span>
                <span className="value -medium">{projectDetail.estimated_cost ? `${this.parseCost(projectDetail.estimated_cost)} US$` : 'Unknown'}</span>
              </div>
              <div className="property column small-6">
                <span className="label">Est. Monetary benefits</span>
                <span className="value -medium">{projectDetail.estimated_monetary_benefits ? `${this.parseCost(projectDetail.estimated_monetary_benefits)} US$` : 'Unknown'}</span>
              </div>
            </Row>
          </div>

          {projectDetail.benefit_details && <div className="project-info-item">
            <span className="label">Benefits detail</span>
            <span className="value">{projectDetail.benefit_details}</span>
          </div>}

          {projectDetail.learn_more && projectDetail.learn_more !== '' && <div className="project-info-item">
            <span className="label">Learn more</span>
            <span className="value">{projectDetail.learn_more && typeof projectDetail.learn_more === 'string' &&
              isUrl(projectDetail.learn_more) ?
                <a className="link" href={projectDetail.learn_more}>{projectDetail.learn_more}</a> :
                projectDetail.learn_more}</span>
          </div>}

          {projectDetail.references && projectDetail.references !== '' && <div className="project-info-item">
            <span className="label">References</span>
            <span className="value">{projectDetail.references && typeof projectDetail.references === 'string' &&
              isUrl(projectDetail.references) ?
                <a className="link" href={projectDetail.references}>{projectDetail.references}</a> :
                projectDetail.references}</span>
          </div>}
        </div>
        <div className="map-container">
          <Map {...mapParams} />
        </div>
      </article>
    );
  }
}

DownloadPdf.defaultProps = {
  projectDetail: {}
};

DownloadPdf.propTypes = {
  projectDetail: React.PropTypes.object,
  projects: React.PropTypes.array,
  getProjects: React.PropTypes.func,
  setProjectsDetail: React.PropTypes.func
};
