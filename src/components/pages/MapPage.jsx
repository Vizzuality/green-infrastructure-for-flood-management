import L from 'leaflet/dist/leaflet';
import React from 'react';
import isEqual from 'lodash/isEqual';
import upperFirst from 'lodash/upperFirst';
import debounce from 'lodash/debounce';
import { SvgIcon } from 'vizz-components';
import { sortByOptions } from 'constants/filters';
import { mapDefaultOptions } from 'constants/map';
import { saveAsFile } from 'utils/general';
import { getMarkers } from 'utils/cluster';
import { setNumberFormat } from 'utils/general';
// Components
import Map from 'components/map/Map';
import Sidebar from 'components/ui/Sidebar';
import Filters from 'components/filters/FiltersContainer';
import ProjectList from 'components/projects/ProjectList';
import ProjectDetail from 'components/projects/ProjectDetail';
import ZoomControl from 'components/zoom/ZoomControl';
import SlidingMenu from 'components/ui/SlidingMenu';
import Spinner from 'components/ui/Spinner';
import SortBy from 'components/ui/SortBy';
import ShareModal from 'components/modal/ShareModal';
import Search from 'components/ui/Search';
import Legend from 'components/ui/Legend';
import OnlyOn from 'components/ui/Responsive';
import SegmentedUi from 'components/ui/SegmentedUi';
import OffCanvas from 'components/ui/OffCanvas';

const million = 1000000;
const mobileMenuItems = [
  { label: 'Filters', value: 'filters' },
  { label: 'Map', value: 'map' },
  { label: 'Project list', value: 'list' }
];

export default class MapPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarScroll: 0,
      markers: getMarkers(props),
      mapMethods: this.getMapMethods(props),
      mobileMenu: 'map'
    };

    this.setLocationsInUrl = false;
    this.projectDetailExist = !!props.projectDetail;

    // Bindings
    this.onSearchChange = debounce(this.onSearchChange, 300);
    this.toggleDataDropdown = this.toggleDataDropdown.bind(this);
    this.onScreenClick = this.onScreenClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onMobileMenuChange = this.onMobileMenuChange.bind(this);
    this.showMobileLegend = this.showMobileLegend.bind(this);
  }

  /* Component lifecycle */
  componentWillMount() {
    // Projects has to be fetched every time becaouse of filter is being done at server
    this.getProjects(this.props.filters);

    // Fetch filter options from server if they haven't been fetched yet
    if (!this.props.filtersOptions.length) {
      this.props.getFiltersOptions();
    }
  }

  componentWillReceiveProps(newProps) {
    if (!isEqual(this.props.filters, newProps.filters)) {
      this.getProjects(newProps.filters);
    }

    if (!isEqual(this.props.projects, newProps.projects) || !isEqual(this.props.projectDetail, newProps.projectDetail) ||
      this.projectDetailExist) {
      this.setState({
        markers: getMarkers(newProps),
        mapMethods: this.getMapMethods(newProps)
      });
    } else if (!isEqual(this.props.mapState, newProps.mapState)) {
      this.setState({ mapMethods: this.getMapMethods(newProps) });
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

  /* Methods */
  onSearchChange(val) {
    this.props.setProjectsFilters({ name: val });
  }

  getQuery(filters) {
    const paramsArray = [];

    Object.keys(filters).forEach((key) => {
      if (filters[key] instanceof Array) {
        const arrayValues = filters[key].reduce((sum, val, i) => {
          if (!val) return '';
          return i === 0 ? `${key}[]=${val.replace(/&/g, '%26')}` : `${sum}&${key}[]=${val.replace(/&/g, '%26')}`;
        }, '');
        arrayValues !== '' && paramsArray.push(arrayValues);
      } else {
        const keyFilter = key === 'name' ? 'q' : key;
        filters[key] && filters[key] !== '' && paramsArray.push(`${keyFilter}=${filters[key]}`);
      }
    });

    const query = paramsArray.reduce((total, val, i) => {
      return i === 0 ? `${val}` : `${total}&${val}`;
    }, '');

    return query;
  }

  getProjects(filters) {
    const query = this.getQuery(filters);
    this.props.getProjects(query);
  }

  getMapListeners() {
    /* NOTE: due to a Leaflet bug, 'moveend' event is fired twice on zoom */
    /* Map listeners */
    return {
      moveend: (map) => {
        this.setLocationsInUrl && this.props.setMapLocation({
          latLng: map.getCenter(),
          zoom: map.getZoom()
        });

        if (!this.setLocationsInUrl) this.setLocationsInUrl = true;
      }
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
        options: { tms: true }
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

    if (props.projectDetail && props.projectDetail.locations.length) {
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
          paddingTopLeft: [props.sidebarWidth, 0],
          paddingBottomRight: [0, 0],
          maxZoom: 8
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

  setFiltersTags(currentFilters) {
    const excludedFilters = ['order', 'direction'];
    const { filtersOptions } = this.props;

    if (Object.keys(filtersOptions).length) {
      return currentFilters.filter(fil => !excludedFilters.includes(fil.filter))
        .map((fil) => {
          if (fil.value instanceof Array) {
            return fil.value.map((v, i) => {
              const key = fil.filter === 'status' ? 'implementation_statuses' : fil.filter;
              const itemFound = filtersOptions[key].find(it => v === it.value);
              return itemFound && <li key={i} className="filter-tag">{upperFirst(itemFound.label)}</li>;
            });
          }
          // No results message
          if (fil.filter === 'name' && !this.props.projects.length) {
            return (
              <li>Your search did not match any documents.</li>
            );
          }
          return (
            <li key={fil.filter} className="filter-tag">{typeof fil.value !== 'number' ?
            upperFirst(fil.value) : `$${setNumberFormat((fil.value * million))}`}
            </li>
          );
        });
    }
    return [];
  }

  toggleDataDropdown(e, specificDropdown, to) {
    const { downloadOpen } = this.state;

    this.setState({ downloadOpen: to ? false : !downloadOpen });

    requestAnimationFrame(() => {
      window[!this.state[specificDropdown] ?
        'removeEventListener' : 'addEventListener']('click', this.onScreenClick, true);
    });
  }

  toggleModal() {
    const opts = {
      children: ShareModal,
      childrenProps: { url: window.location.href }
    };
    this.props.toggleModal(true, opts);
  }

  showMobileLegend() {
    this.props.toggleModal(true, {
      children: Legend,
      className: '-collapsed',
      childrenProps: { layersActive: this.props.mapState.layersActive }
    });
  }

  onMobileMenuChange({ value }) {
    if (value === 'filters') {
      this.props.toggleModal(true, {
        children: Filters,
        className: '-fs',
        childrenProps: { options: this.props.filtersOptions }
      });
    } else {
      this.setState({ mobileMenu: value });
    }
  }

  /* Render */
  render() {
    /* Map params */
    const listeners = this.getMapListeners();
    const mapOptions = this.getMapOptions();
    const { markers, mapMethods } = this.state;
    const mapParams = { listeners, mapMethods, mapOptions, markers };
    const intoArrayFilters = Object.keys(this.props.filters)
      .map(k => Object.assign({}, { filter: k, value: this.props.filters[k] || {} }))
      .filter(obj => obj.value && obj.value.length || typeof obj.value === 'number');

    const filtersTags = this.setFiltersTags(intoArrayFilters);
    const filtersQuery = this.getQuery(this.props.filters);
    const items = mobileMenuItems.filter(i => i.value !== this.state.mobileMenu);
    const searchComponent = (<Search
      focus={this.props.filtersUi.searchFocus}
      defaultValue={this.props.filters.name}
      onChange={evt => this.onSearchChange(evt.target.value)}
      onClear={() => this.props.setProjectsFilters({ name: '' })}
      placeholder="Search project"
      clear
    />);

    return (
      <div className="c-map-page l-map-page">
        <button className="share-btn" onClick={this.toggleModal}>
          <SvgIcon name="icon-share" className="-medium" />
        </button>
        <button className="legend-btn" onClick={this.showMobileLegend}>
          <SvgIcon name="icon-legend" className="-medium" />
        </button>
        <OnlyOn device="mobile">
          {!this.props.projectDetail ? <SegmentedUi items={items} onChange={this.onMobileMenuChange} /> : ''}
        </OnlyOn>
        <OnlyOn device="desktop">
          <Sidebar
            filtersOpened={!this.props.filtersUi.closed}
            onToggle={this.props.setSidebarWidth}
            scroll={this.state.sidebarScroll}
            showBtn
            onDetail={!!this.props.projectDetail}
            actions={{
              focusSearch: () => this.props.setFiltersUi({ closed: true, searchFocus: true }),
              openFilters: () => this.props.setFiltersUi({ closed: false })
            }}
            className={this.props.projectDetail ? '-project-detail' : ''}
          >
            <Spinner isLoading={this.props.loading} />
            {this.props.projectDetail ?
              <ProjectDetail
                data={this.props.projectDetail}
                relatedProjects={this.props.relatedProjects || []}
                relatedLoading={this.props.relatedLoading}
              /> :
              <div className="project-list-wrapper">
                <SlidingMenu
                  title="filters"
                  closed={this.props.filtersUi.closed}
                  onToggle={() => this.props.setFiltersUi({ closed: !this.props.filtersUi.closed })}
                  downloadUrl={`https://naturebasedsolutions.org/api/projects.csv?${filtersQuery}`}
                  download
                >
                  <Filters close={() => this.props.setFiltersUi({ closed: true })} options={this.props.filtersOptions} />
                </SlidingMenu>
                <div className="list-actions">
                  {searchComponent}
                  <div className="sidebar-actions">
                    <SortBy
                      order={this.props.filters.order}
                      direction={this.props.filters.direction}
                      list={sortByOptions}
                      setProjectsFilters={this.props.setProjectsFilters}
                    />
                  </div>
                </div>
                {filtersTags.length > 0 &&
                  <div className="current-filters">
                    <ul className="filters-list">{filtersTags}</ul>
                  </div>}
                <ProjectList projects={this.props.projects} />
              </div>
            }
          </Sidebar>
        </OnlyOn>
        <div className="relative-container">
          {/* Map and zoom control */}
          <ZoomControl
            zoom={this.props.mapState.zoom}
            onZoomChange={zoom => this.props.setMapLocation({ zoom })}
            maxZoom={mapDefaultOptions.maxZoom}
            minZoom={mapDefaultOptions.minZoom}
          />
          <Map {...mapParams} />
          {/* Mobile map and project list */}
          <OnlyOn device="mobile">
            <OffCanvas className="-projects" opened={this.state.mobileMenu === 'list'}>
              {searchComponent}
              {this.props.projectDetail ?
                <ProjectDetail
                  data={this.props.projectDetail}
                  relatedProjects={this.props.relatedProjects || []}
                  relatedLoading={this.props.relatedLoading}
                /> :
                <ProjectList projects={this.props.projects} />
              }
            </OffCanvas>
          </OnlyOn>
          {/* Desktop legend */}
          <OnlyOn device="desktop">
            <Legend layersActive={this.props.mapState.layersActive} />
          </OnlyOn>
        </div>
      </div>
    );
  }
}

MapPage.propTypes = {
  // State
  projects: React.PropTypes.array,
  loading: React.PropTypes.bool,
  relatedProjects: React.PropTypes.array,
  relatedLoading: React.PropTypes.bool,
  filtersOptions: React.PropTypes.object,
  mapState: React.PropTypes.object,
  filters: React.PropTypes.object,
  sidebarWidth: React.PropTypes.number,
  filtersUi: React.PropTypes.object,
  // Selector
  projectDetail: React.PropTypes.any,
  // Actions
  getProjects: React.PropTypes.func,
  setProjectsFilters: React.PropTypes.func,
  toggleModal: React.PropTypes.func,
  setSidebarWidth: React.PropTypes.func,
  updateUrl: React.PropTypes.func,
  setMapLocation: React.PropTypes.func,
  resetMapState: React.PropTypes.func,
  setFiltersUi: React.PropTypes.func,
  getFiltersOptions: React.PropTypes.func
};
