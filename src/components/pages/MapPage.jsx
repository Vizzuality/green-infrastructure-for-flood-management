import React from 'react';
import Map from 'components/map/Map';
import Sidebar from 'components/ui/Sidebar';

export default class MapPage extends React.Component {
  render() {
    const mapMethods = {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      zoomControlPosition: 'topright',
      tileLayers: [
        { url: config.BASEMAP_LABEL_URL, zIndex: 0 },
        { url: config.BASEMAP_TILE_URL, zIndex: 1000 }
      ]
    };

    return (
      <div className="c-map-page l-map-page">
        <Sidebar />
        <Map mapMethods={mapMethods} />
      </div>
    );
  }
}
