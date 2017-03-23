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
import { Spinner } from 'vizz-components';

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

    if (this.props.projectDetail && this.props.projectDetail.locations.length && this.props.projectDetail.locations[0].centroid) {
      const { coordinates } = this.props.projectDetail.locations[0].centroid;
      const point = [coordinates[1], coordinates[0]];
      methods.fitBounds = {
        bounds: [point, point],
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
      minZoom: 2,
      maxZoom: 9,
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

          // We should check if the sidebar is opened
          const sidebarWidth = this.props.sidebarWidth + 25;
          pruneCluster._map.fitBounds(bounds, {
            paddingTopLeft: [sidebarWidth, 25],
            paddingBottomRight: [50, 25]
          });
        }
      });

      return marker;
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
        <Sidebar onToggle={this.props.setSidebarWidth} scroll={this.state.sidebarScroll}>
          {this.props.loading && <Spinner />}
          {this.props.projectDetail ?
            <div className="project-detail-wrapper">
              <ProjectDetail data={this.props.projectDetail} onBack={() => this.props.setProjectsDetail(null)} />
            </div> :
            <div className="project-list-wrapper">
              <SlidingMenu title="filters">
                <Filters />
              </SlidingMenu>
              <input
                className="c-search"
                type="search"
                value={this.props.searchQuery}
                onChange={evt => this.props.setProjectsSearch(evt.target.value)}
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
  sidebarWidth: React.PropTypes.number,
  loading: React.PropTypes.bool,
  // Selector
  projectDetail: React.PropTypes.any,
  // Actions
  getProjects: React.PropTypes.func,
  setSidebarWidth: React.PropTypes.func,
  setProjectsSearch: React.PropTypes.func,
  updateUrl: React.PropTypes.func,
  setMapLocation: React.PropTypes.func,
  setProjectsDetail: React.PropTypes.func
};
