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

    if (this.props.projectDetail && this.props.projectDetail.locations.length && this.props.projectDetail.locations[0].centroid) {
      const { coordinates } = this.props.projectDetail.locations[0].centroid;
      methods.view = [coordinates[1], coordinates[0]];
    }

    return methods;
  }

  getMapOptions() {
    /* Map options */
    return {
      zoom: this.props.mapState.zoom,
      minZoom: 2,
      maxZoom: 7,
      zoomControl: false,
      center: [this.props.mapState.latLng.lat, this.props.mapState.latLng.lng]
    };
  }

  getMarkers() {
    const pruneCluster = new PruneClusterForLeaflet();

    /* Marker icon */
    pruneCluster.PrepareLeafletMarker = (leafletMarker) => {
      leafletMarker.setIcon(L.divIcon({
        iconSize: [15, 15],
        className: 'c-marker',
        html: '<div class="marker-inner"></div>'
      }));
    };

    /* Cluster icon */
    pruneCluster.BuildLeafletClusterIcon = ({ population }) => {
      const size = 15 + Math.pow(population * 100, 0.5);
      return L.divIcon({
        iconSize: [size, size],
        className: 'c-marker',
        html: `<div class="marker-inner">${population}</div>`
      });
    };

    this.props.projects.filter(p => p.locations && p.locations.length && p.locations[0].centroid)
    .forEach((p) => {
      const lat = p.locations[0].centroid.coordinates[1];
      const lng = p.locations[0].centroid.coordinates[0];
      const marker = new PruneCluster.Marker(lat, lng);
      marker.data = p;
      pruneCluster.RegisterMarker(marker);
    });

    return this.props.projects.length ? [{ id: 'clusterLayer', marker: pruneCluster }] : [];
  }

  /* Render */
  render() {
    /* Map params */
    const listeners = this.getMapListeners();
    const mapMethods = this.getMapMethods();
    const mapOptions = this.getMapOptions();
    const markers = this.getMarkers();

    const mapParams = { listeners, mapMethods, mapOptions, markers };

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
        <Map {...mapParams} />
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
