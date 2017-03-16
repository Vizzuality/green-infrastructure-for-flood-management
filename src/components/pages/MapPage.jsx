import React from 'react';
import Map from 'components/map/Map';
import Sidebar from 'components/ui/Sidebar';
import Filters from 'components/filters/FiltersContainer';
import ProjectList from 'components/projects/ProjectList';
import ProjectDetail from 'components/projects/ProjectDetail';
import ZoomControl from 'components/zoom/ZoomControl';
import SlidingMenu from 'components/ui/SlidingMenu'

export default class MapPage extends React.Component {
  componentWillMount() {
    this.props.updateUrl();
    if (!this.props.projects.length) this.props.getProjects();
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

    const mapMethods = {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      tileLayers: [
        { url: config.BASEMAP_LABEL_URL, zIndex: 0 },
        { url: config.BASEMAP_TILE_URL, zIndex: 1000 }
      ]
    };

    const mapOptions = {
      zoom: this.props.mapState.zoom,
      minZoom: 2,
      maxZoom: 7,
      zoomControl: false,
      center: [this.props.mapState.latLng.lat, this.props.mapState.latLng.lng]
    };

    return (
      <div className="c-map-page l-map-page">
        <Sidebar>
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
              <ProjectList projects={this.props.projects} onProjectSelect={this.props.setProjectDetail} />
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
