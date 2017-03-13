import React from 'react';
import Map from 'components/map/Map';
import Sidebar from 'components/ui/Sidebar';
import Filters from 'components/filters/FiltersContainer';
import ProjectList from 'components/projects/ProjectList';
import ZoomControl from 'components/zoom/ZoomControl';

export default class MapPage extends React.Component {
  componentWillMount() {
    this.props.updateUrl();
    if (!this.props.projects.length) this.props.getProjects();
  }

  render() {
    /* Map config */
    const updateMap = (map) => {
      this.props.setMapLocation({
        latLng: map.getCenter()
      });
    };

    const listeners = {
      moveend: updateMap
    };

    const mapMethods = {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      tileLayers: [
        { url: config.BASEMAP_LABEL_URL, zIndex: 0 },
        { url: config.BASEMAP_TILE_URL, zIndex: 1000 }
      ]
    };

    const mapOptions = {
      zoom: this.props.mapState.zoom,
      zoomControl: false,
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
        <ZoomControl
          zoom={this.props.mapState.zoom}
          onZoomChange={zoom => this.props.setMapLocation({ zoom })}
        />
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
