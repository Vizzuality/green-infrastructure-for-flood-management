import React from 'react';
import Map from 'components/map/Map';
import Sidebar from 'components/ui/Sidebar';
import Filters from 'components/filters/FiltersContainer';
import ProjectList from 'components/projects/ProjectList';

export default class MapPage extends React.Component {
  componentWillMount() {
    this.props.updateUrl();
    if (!this.props.projects.length) this.props.getProjects();
  }

  render() {
    /* Map config */
    const updateMap = (map) => {
      this.props.setMapLocation({
        zoom: map.getZoom(),
        latLng: map.getCenter()
      });
    };

    const listeners = {
      zoomend: updateMap,
      moveend: updateMap
    };

    const mapMethods = {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      zoomControlPosition: 'topright',
      tileLayers: [
        { url: config.BASEMAP_LABEL_URL, zIndex: 0 },
        { url: config.BASEMAP_TILE_URL, zIndex: 1000 }
      ]
    };

    const mapOptions = {
      zoom: this.props.mapState.zoom,
      center: [this.props.mapState.latLng.lat, this.props.mapState.latLng.lng]
    };

    return (
      <div className="c-map-page l-map-page">
        <Sidebar>
          <Filters />
          <input
            className="c-search"
            type="search"
            value={this.props.searchQuery}
            onChange={evt => this.props.setProjectSearch(evt.target.value)}
          />
          <ProjectList projects={this.props.projects} />
        </Sidebar>
        <Map
          mapOptions={mapOptions}
          mapMethods={mapMethods}
          listeners={listeners}
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
  // Actions
  getProjects: React.PropTypes.func,
  setProjectSearch: React.PropTypes.func,
  updateUrl: React.PropTypes.func,
  setMapLocation: React.PropTypes.func
};
