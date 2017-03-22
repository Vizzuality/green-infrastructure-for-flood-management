import L from 'leaflet/dist/leaflet';
import React from 'react';
import Map from 'components/map/Map';
import Sidebar from 'components/ui/Sidebar';
import Filters from 'components/filters/FiltersContainer';
import ProjectList from 'components/projects/ProjectList';
import ProjectDetail from 'components/projects/ProjectDetail';
import ZoomControl from 'components/zoom/ZoomControl';
import SlidingMenu from 'components/ui/SlidingMenu'

export default class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarScroll: 0
    };

    // Bindings
    this.goToProjectDetail = this.goToProjectDetail.bind(this);
  }

  componentWillMount() {
    this.props.updateUrl();
    if (!this.props.projects.length) this.props.getProjects();
  }

  goToProjectDetail(projectId) {
    this.setState({
      sidebarScroll: 0
    });
    this.props.setProjectDetail(projectId);
  }

  render() {
    /* Map config */
    const updateMap = (map) => {
      this.props.setMapLocation({
        latLng: map.getCenter(),
        zoom: map.getZoom()
      });
    };

    /* NOTE: due to a Leaflet bug, 'moveend' event is fired twice on zoom */
    const listeners = {
      moveend: updateMap
    };

    /* Map methods */
    const mapMethods = {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      tileLayers: [
        { url: config.BASEMAP_TILE_URL, zIndex: 0 }
      ]
    };

    /* Map options */
    const mapOptions = {
      zoom: this.props.mapState.zoom,
      minZoom: 2,
      maxZoom: 7,
      zoomControl: false,
      center: [this.props.mapState.latLng.lat, this.props.mapState.latLng.lng]
    };

    /* Markers */
    const markers = this.props.projects.filter(p => p.locations && p.locations.length && p.locations[0].centroid)
    .map((p) => {
      const { id } = p;
      const lat = p.locations[0].centroid.coordinates[1];
      const lng = p.locations[0].centroid.coordinates[0];

      return { id, lat, lng };
    });

    /* Marker icon */
    const markerIcon = L.divIcon({
      className: 'c-marker',
      html: '<div class="marker-inner"></div>'
    });

    return (
      <div className="c-map-page l-map-page">
        <Sidebar scroll={this.state.sidebarScroll} >
          {this.props.projectDetail ?
            <div className="project-detail-wrapper">
              <ProjectDetail data={this.props.projectDetail} onBack={() => this.props.setProjectDetail(null)} />
            </div> :
            <div className="project-list-wrapper">
              <SlidingMenu title="filters">
                <Filters />
              </SlidingMenu>
              <input
                className="c-search"
                type="search"
                value={this.props.searchQuery}
                onChange={evt => this.props.setProjectSearch(evt.target.value)}
              />
            <ProjectList projects={this.props.projects} onProjectSelect={this.goToProjectDetail} />
            </div>
          }
        </Sidebar>
        <ZoomControl
          zoom={this.props.mapState.zoom}
          onZoomChange={zoom => this.props.setMapLocation({ zoom })}
        />
        <Map
          mapOptions={mapOptions}
          mapMethods={mapMethods}
          listeners={listeners}
          markers={markers}
          markerIcon={markerIcon}
        />
      </div>
    );
  }
}

MapPage.propTypes = {
  // State
  projects: React.PropTypes.array,
  searchQuery: React.PropTypes.string,
  mapState: React.PropTypes.object,
  // Selector
  projectDetail: React.PropTypes.any,
  // Actions
  getProjects: React.PropTypes.func,
  setProjectSearch: React.PropTypes.func,
  updateUrl: React.PropTypes.func,
  setMapLocation: React.PropTypes.func,
  setProjectDetail: React.PropTypes.func
};
