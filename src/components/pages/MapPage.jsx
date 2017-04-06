import L from 'leaflet/dist/leaflet';
import { PruneCluster, PruneClusterForLeaflet } from 'lib/PruneCluster';
import React from 'react';
import Map from 'components/map/Map';
import Sidebar from 'components/ui/Sidebar';
import Filters from 'components/filters/FiltersContainer';
import ProjectList from 'components/projects/ProjectList';
import ProjectDetail from 'components/projects/ProjectDetail';
import ZoomControl from 'components/zoom/ZoomControl';
import SlidingMenu from 'components/ui/SlidingMenu'
import Spinner from 'components/ui/Spinner';
import SortBy from 'components/ui/SortBy';
import Search from 'components/ui/Search';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import { SvgIcon } from 'vizz-components';
import { sortByOptions } from 'constants/filters';
import { mapDefaultOptions } from 'constants/map';
import TetherComponent from 'react-tether';

export default class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarScroll: 0,
      downloadOpen: false
    };

    // Bindings
    this.goToProjectDetail = this.goToProjectDetail.bind(this);
    this.onSearchChange = debounce(this.onSearchChange, 300);
    this.toggleDataDropdown = this.toggleDataDropdown.bind(this);
    this.onScreenClick = this.onScreenClick.bind(this);
  }

  /* Component lifecycle */
  componentWillMount() {
    this.props.updateUrl();

    // Fetch projects from server if they haven't been fetched yet
    if (!this.props.projects.length) {
      this.getProjects(this.props.filters);
    }

    // Fetch projects from server if they haven't been fetched yet
    if (!this.props.filtersOptions.length) {
      this.props.getFiltersOptions();
    }
  }

  componentWillReceiveProps(newProps) {
    if (!isEqual(this.props.filters, newProps.filters)) {
      this.getProjects(newProps.filters);
    }
  }

  componentWillUnmount() {
    this.props.resetMapState();
    window.removeEventListener('click', this.onScreenClick);
  }

  onScreenClick(e) {
    const el = document.querySelector('.c-dropdown');
    const clickOutside = el && el.contains && !el.contains(e.target);
    const isDownloadBtn = this.downloadBtn.contains(e.target);

    if (clickOutside) {
      (!isDownloadBtn) ? this.toggleDataDropdown(e, 'downloadOpen', true) : null;
    }
  }

  toggleDataDropdown(e, specificDropdown, to) {
    const { downloadOpen } = this.state;

    this.setState({ downloadOpen: to ? false : !downloadOpen });

    requestAnimationFrame(() => {
      window[!this.state[specificDropdown] ?
        'removeEventListener' : 'addEventListener']('click', this.onScreenClick, true);
    });
  }

  /* Methods */
  getProjects(filters) {
    // TODO: pagination
    let paramsArray = [];

    Object.keys(filters).forEach((key, i) => {
      if (filters[key] instanceof Array) {
        const arrayValues = filters[key].reduce((sum, val, i) => {
          return i === 0 ? `${key}[]=${val}` : `${sum}&${key}[]=${val}`;
        }, '');
        arrayValues !== '' && paramsArray.push(arrayValues);
      } else {
        filters[key] && filters[key] !== '' && paramsArray.push(`${key}=${filters[key]}`);
      }
    });

    const query = paramsArray.reduce((total, val, i) => {
      return i === 0 ? `${val}` : `${total}&${val}`;
    }, '');

    this.props.getProjects(query);
  }

  onSearchChange(val) {
    this.props.setProjectsFilters({ name: val });
  }

  goToProjectDetail(projectId) {
    this.setState({
      sidebarScroll: 0
    });
    this.props.setProjectsDetail(projectId);
  }

  getMapListeners() {
    /* NOTE: due to a Leaflet bug, 'moveend' event is fired twice on zoom */
    /* Map listeners */
    return {
      moveend: (map) => {
        this.props.setMapLocation({
          latLng: map.getCenter(),
          zoom: map.getZoom()
        });
      }
    };
  }

  getMapMethods() {
    /* Map methods */
    const methods = {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      tileLayers: [
        { url: config.BASEMAP_TILE_URL, zIndex: 0 }
      ]
    };

    let points = [];

    if (this.props.projectDetail && this.props.projectDetail.locations.length) {
      // If we are in project detail, bounds are the project detail locations
      points = this.props.projectDetail.locations.map(p => [p.centroid.coordinates[1], p.centroid.coordinates[0]]);
    } else {
      // If we are in global view, bounds are all project locations
      this.props.projects.forEach((project) => {
        points.push(project.locations.map(p => [p.centroid.coordinates[1], p.centroid.coordinates[0]]));
      });
    }

    if (points.length) {
      const bounds = L.latLngBounds(points);
      methods.fitBounds = {
        bounds,
        options: {
          paddingTopLeft: [this.props.sidebarWidth, 0],
          paddingBottomRight: [0, 0]
        }
      };
    }

    return methods;
  }

  getMapOptions() {
    /* Map options */
    return {
      zoom: this.props.mapState.zoom,
      zoomControl: false,
      center: [this.props.mapState.latLng.lat, this.props.mapState.latLng.lng]
    };
  }

  getPopupMarkup(data) {
    const orgs = data.organizations.map(org => org.name).join(', ');
    const hazards = data.hazard_types.map(haz => haz.name).join(', ');
    const url = `/map?detail=${data.id}`;

    return `
      <div class="c-tooltip">
        <div class="tooltip-content">
          <div class="project-name">${data.name}</div>
          <div class="project-orgs">${orgs}</div>
          <div class="project-hazards">${hazards}</div>
        </div>
        <a class="tooltip-link" href="${url}">More info</a>
      </div>
    `;
  }

  getMarkers() {
    const pruneCluster = new PruneClusterForLeaflet();

    /* Marker icon */
    pruneCluster.PrepareLeafletMarker = (leafletMarker, data) => {
      leafletMarker.setIcon(L.divIcon({
        iconSize: [15, 15],
        className: 'c-marker',
        html: '<div class="marker-inner"></div>'
      }));

      // Bind Popup
      leafletMarker.bindPopup(this.getPopupMarkup(data));

      // Set listeners
      leafletMarker.off('click').on('click', function mouseover() {
        this.openPopup();
      });
    };

    /* Cluster */
    pruneCluster.BuildLeafletCluster = (cluster, position) => {
      const size = 15 + Math.pow(cluster.population * 100, 0.5);
      /* Cluster icon */
      const icon = L.divIcon({
        iconSize: [size, size],
        className: 'c-marker',
        html: `<div class="marker-inner">${cluster.population}</div>`
      });

      const marker = new L.Marker(position, { icon });

      marker.on('click', () => {
        /* Fitbounds width sidebar width padding */
        const markersArea = pruneCluster.Cluster.FindMarkersInArea(cluster.bounds);
        const b = pruneCluster.Cluster.ComputeBounds(markersArea);

        if (b) {
          const bounds = new L.LatLngBounds(
            new L.LatLng(b.minLat, b.maxLng),
            new L.LatLng(b.maxLat, b.minLng));

          const zoomLevelBefore = pruneCluster._map.getZoom();
          const zoomLevelAfter = pruneCluster._map.getBoundsZoom(bounds, false, new L.Point(20, 20, null));

          if (zoomLevelAfter === zoomLevelBefore) {
            pruneCluster._map.fire('overlappingmarkers', {
              cluster: pruneCluster,
              markers: markersArea,
              center: marker.getLatLng(),
              marker
            });
          } else {
            // We should check if the sidebar is opened
            const sidebarWidth = this.props.sidebarWidth + 25;
            pruneCluster._map.fitBounds(bounds, {
              paddingTopLeft: [sidebarWidth, 25],
              paddingBottomRight: [50, 25]
            });
          }

        }
      });

      return marker;
    };

    function pushMarker(project) {
      let lat;
      let lng;
      let marker;
      // Iterate over all posible project locations
      project.locations.forEach((location) => {
        lat = location.centroid.coordinates[1];
        lng = location.centroid.coordinates[0];
        marker = new PruneCluster.Marker(lat, lng);
        marker.data = project;
        pruneCluster.RegisterMarker(marker);
      });
    }

    const { projectDetail } = this.props;
    if (projectDetail) {
      // If projectDetails is setted, just display that project on map
      if (projectDetail.locations && projectDetail.locations.length) {
        pushMarker(projectDetail);
      }
    } else {
      // If not, let's show all projects
      this.props.projects.filter(p => p.locations && p.locations.length && p.locations[0].centroid)
      .forEach(pushMarker);
    }

    return (this.props.projects.length || projectDetail) ? [{ id: 'clusterLayer', marker: pruneCluster }] : [];
  }

  /* Render */
  render() {
    /* Map params */
    const listeners = this.getMapListeners();
    const mapMethods = this.getMapMethods();
    const mapOptions = this.getMapOptions();
    const markers = this.getMarkers();

    const { downloadOpen } = this.state;
    const mapParams = { listeners, mapMethods, mapOptions, markers };

    return (
      <div className="c-map-page l-map-page">
        <Sidebar
          onToggle={this.props.setSidebarWidth}
          scroll={this.state.sidebarScroll}
          showBtn={!this.props.projectDetail}
          actions={{
            focusSearch: () => this.props.setFiltersUi({ closed: true, searchFocus: true }),
            openFilters: () => this.props.setFiltersUi({ closed: false })
          }}
        >
          <Spinner className="-transparent" isLoading={this.props.loading} />
          {this.props.projectDetail ?
            <ProjectDetail data={this.props.projectDetail} onBack={() => this.props.setProjectsDetail(null)} /> :
            <div className="project-list-wrapper">
              <SlidingMenu
                title="filters"
                closed={this.props.filtersUi.closed}
                onToggle={() => this.props.setFiltersUi({ closed: !this.props.filtersUi.closed })}
              >
                <Filters close={() => this.props.setFiltersUi({ closed: true })} options={this.props.filtersOptions} />
              </SlidingMenu>
              <Search
                focus={this.props.filtersUi.searchFocus}
                defaultValue={this.props.filters.name}
                onChange={evt => this.onSearchChange(evt.target.value)}
              />
              <div className="sidebar-actions">
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
                  <button
                    className="download"
                    onClick={(e) => this.toggleDataDropdown(e, 'downloadOpen')}
                    ref={c => this.downloadBtn = c}
                  >
                    <SvgIcon name="icon-download" className="download -medium" />
                    Download data
                  </button>
                  { /* Second child: If present, this item will be tethered to the the first child */ }
                  {
                    downloadOpen &&
                    <div>
                      <p>Not available</p>
                    </div>
                  }
                </TetherComponent>
                <SortBy
                  order={this.props.filters.order}
                  direction={this.props.filters.direction}
                  list={sortByOptions}
                  setProjectsFilters={this.props.setProjectsFilters}
                />
              </div>
              <ProjectList projects={this.props.projects} onProjectSelect={this.goToProjectDetail} />
            </div>
          }
        </Sidebar>
        <ZoomControl
          zoom={this.props.mapState.zoom}
          onZoomChange={zoom => this.props.setMapLocation({ zoom })}
          maxZoom={mapDefaultOptions.maxZoom}
          minZoom={mapDefaultOptions.minZoom}
        />
        <Map {...mapParams} />
      </div>
    );
  }
}

MapPage.propTypes = {
  // State
  projects: React.PropTypes.array,
  mapState: React.PropTypes.object,
  filters: React.PropTypes.object,
  sidebarWidth: React.PropTypes.number,
  loading: React.PropTypes.bool,
  filtersUi: React.PropTypes.object,
  // Selector
  projectDetail: React.PropTypes.any,
  // Actions
  getProjects: React.PropTypes.func,
  setProjectsFilters: React.PropTypes.func,
  setSidebarWidth: React.PropTypes.func,
  updateUrl: React.PropTypes.func,
  setMapLocation: React.PropTypes.func,
  resetMapState: React.PropTypes.func,
  setProjectsDetail: React.PropTypes.func,
  setFiltersUi: React.PropTypes.func
};
