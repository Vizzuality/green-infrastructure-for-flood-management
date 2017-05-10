/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import React from 'react';
import L from 'leaflet/dist/leaflet';
import isEqual from 'lodash/isEqual';
import { mapDefaultOptions } from 'constants/map';
import LayerManager from './LayerManager';

function addOrRemove(oldItems, newItems, addCb, removeCb) {
  // TODO: improve performace uning sets instead of looping over arrays
  oldItems.forEach(i => !newItems.find(ii => i.id === ii.id) && removeCb(i));
  newItems.forEach(i => !oldItems.find(ii => i.id === ii.id) && addCb(i));
}

export default class Map extends React.Component {

  /* Constructor */
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  /* Component Lyfecyle */
  componentDidMount() {
    this._mounted = true;
    const mapOptions = Object.assign({}, mapDefaultOptions, this.props.mapOptions);
    this.map = L.map(this.mapNode, mapOptions);

    // TODO: don't expose map to window
    window.__map__ = this.map;

    // Add event listeners
    this.props.listeners && this.setMapEventListeners();
    // Exec leaflet methods
    this.execMethods();
    // Add layers
    this.initLayerManager();
    this.props.layers.length && this.addLayer(this.props.layers);
    this.props.markers.length && this.addMarker(this.props.markers);
  }

  componentWillReceiveProps(nextProps) {
    // Fitbounds
    if (!isEqual(this.props.mapMethods.fitBounds, nextProps.mapMethods.fitBounds) && nextProps.mapMethods.fitBounds) {
      this.map.fitBounds(nextProps.mapMethods.fitBounds.bounds, nextProps.mapMethods.fitBounds.options);
    }

    // Layers z-index
    if (!isEqual(this.props.mapMethods.tileLayers, nextProps.mapMethods.tileLayers)) {
      this.setZIndex(nextProps.mapMethods.tileLayers);
    }

    // Layers
    if (!isEqual(this.props.layers, nextProps.layers)) {
      addOrRemove(this.props.layers, nextProps.layers, layer => this.addLayer(layer), layer => this.removeLayer(layer.id));
    }

    // Markers
    if (!isEqual(this.props.markers, nextProps.markers)) {
      // TODO: just add or remove markers that have changed
      this.removeMarker(this.props.markers);
      this.addMarker(nextProps.markers);
    }

    // Zoom
    if (this.props.mapOptions.zoom !== nextProps.mapOptions.zoom) {
      this.map.setZoom(nextProps.mapOptions.zoom);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const loadingChanged = this.state.loading !== nextState.loading;
    return loadingChanged;
  }

  componentWillUnmount() {
    this._mounted = false;
    this.props.listeners && this.removeMapEventListeners();
    this.map.remove();
    window.__map__ = null;
  }

  /* MapMethods methods */
  setAttribution() {
    this.map.attributionControl.addAttribution(this.props.mapMethods.attribution);
  }

  setZoomControlPosition() {
    this.map.zoomControl.setPosition(this.props.mapMethods.zoomControlPosition);
  }

  setTileLayers() {
    const { tileLayers } = this.props.mapMethods;
    this.tileLayers = {};

    tileLayers.forEach((tile) => {
      this.tileLayers[tile.name] = L.tileLayer(tile.url, tile.options || {}).addTo(this.map).setZIndex(tile.zIndex);
    });
  }

  setZIndex(tiles) {
    tiles.forEach((t) => {
      this.tileLayers[t.name].setZIndex(t.zIndex);
    });
  }

  /* Event listener methods */
  setMapEventListeners() {
    const { listeners } = this.props;
    Object.keys(listeners).forEach((eventName) => {
      this.map.on(eventName, (...args) => listeners[eventName](this.map, ...args));
    });
  }

  removeMapEventListeners() {
    const { listeners } = this.props;
    const eventNames = Object.keys[listeners];
    eventNames && eventNames.forEach(eventName => this.map.off(eventName));
  }

  execMethods() {
    Object.keys(this.props.mapMethods).forEach((name) => {
      const methodName = name.charAt(0).toUpperCase() + name.slice(1);
      const fnName = `set${methodName}`;
      typeof this[fnName] === 'function' && this[fnName].call(this);
    });
  }

  /* LayerManager initialization */
  initLayerManager() {
    const stopLoading = () => {
      this._mounted && this.setState({
        loading: false
      });
    };

    this.layerManager = new LayerManager(this.map, {
      onLayerAddedSuccess: stopLoading,
      onLayerAddedError: stopLoading
    });
  }

  /* Layer methods */
  addLayer(layer) {
    this.setState({
      loading: true
    });
    if (Array.isArray(layer)) {
      layer.forEach(l => this.layerManager.addLayer(l));
      return;
    }
    this.layerManager.addLayer(layer);
  }

  removeLayer(layer) {
    if (Array.isArray(layer)) {
      layer.forEach(l => this.layerManager.removeLayer(l.id));
      return;
    }
    this.layerManager.removeLayer(layer.id);
  }

  /* Marker methods */
  addMarker(marker) {
    if (Array.isArray(marker)) {
      marker.forEach(m => this.layerManager.addMarker(m));
      return;
    }
    this.layerManager.addMarker(marker);
  }

  removeMarker(markerId) {
    if (Array.isArray(markerId)) {
      markerId.forEach(m => this.layerManager.removeMarker(m.id));
      return;
    }
    this.layerManager.removeMarker(markerId);
  }

  /* Render method */
  render() {
    return (
      <div className="c-map">
        <div ref={(node) => { this.mapNode = node; }} className="map-leaflet" />
      </div>
    );
  }
}

Map.propTypes = {
  mapOptions: React.PropTypes.object,
  mapMethods: React.PropTypes.object,
  layers: React.PropTypes.array,
  markers: React.PropTypes.array,
  listeners: React.PropTypes.object
};

Map.defaultProps = {
  mapOptions: {},
  mapMethods: {},
  layers: [],
  listeners: {},
  markers: []
};
