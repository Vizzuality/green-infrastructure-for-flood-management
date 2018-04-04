/* global google */
import React from 'react';

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps/lib';
import SearchBox from 'react-google-maps/lib/places/SearchBox';

const INPUT_STYLE = {
  boxSizing: 'border-box',
  border: '0',
  borderBottom: '1px solid rgba(0, 0, 0, .3)',
  top: '0',
  left: '0 !important',
  zIndex: '3'
};

const SearchBoxGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    onCenterChanged={props.onCenterChanged}
    onDragEnd={props.onDragEnd}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder=""
      inputStyle={INPUT_STYLE}
      inputProps={props.inputProps}
    />
    <button className="c-btn -transparent -primary add-location" onClick={props.onAddLocation}>Add</button>
    {props.markers.map((marker, index) => (
      <Marker
        position={marker.position}
        key={index}
        onClick={props.onMarkerClick}
      />
    ))}
  </GoogleMap>));


export default class InputMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bounds: null,
      center: {
        lat: 47.6205588,
        lng: -122.3212725
      },
      markers: [],
      value: props.inputProps ? props.inputProps.value : ''
    };

    // BINDINGS
    this.onMapMounted = this.onMapMounted.bind(this);
    this.onBoundsChanged = this.onBoundsChanged.bind(this);
    this.onSearchBoxMounted = this.onSearchBoxMounted.bind(this);
    this.onPlacesChanged = this.onPlacesChanged.bind(this);
    this.onCenterChanged = this.onCenterChanged.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onAddLocation = this.onAddLocation.bind(this);
  }

  /**
   * UI EVENTS
   * - onChange
  */
  onMapMounted(map) {
    this._map = map;
  }

  onBoundsChanged() {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter()
    });
  }

  onCenterChanged(e) {
    const center = this._map.getCenter();
    const markers = [{ position: center }];

    this.setState({
      center,
      markers
    });
  }

  onDragEnd() {
  }

  onSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  onPlacesChanged() {
    const places = this._searchBox.getPlaces();
    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({ position: place.geometry.location }));

    // Set markers; set map center to first search result
    const mapMarkerCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapMarkerCenter,
      markers
    });
  }

  onAddLocation(e) {
    const { markers } = this.state;
    const marker = e.latLng || markers && markers.length && markers[0].position;

    marker && this.props.onAddLocation(marker);
  }

  render() {
    const inputProps = Object.assign({}, { value: this.state.value || '' });

    return (
      <div className="c-input-map">
        <SearchBoxGoogleMap
          containerElement={
            <div style={{ height: '100%' }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          center={this.state.center}
          onMapMounted={this.onMapMounted}
          onBoundsChanged={this.onBoundsChanged}
          onSearchBoxMounted={this.onSearchBoxMounted}
          bounds={this.state.bounds}
          onPlacesChanged={this.onPlacesChanged}
          markers={this.state.markers}
          inputProps={inputProps}
          onMarkerClick={this.onAddLocation}
          onCenterChanged={this.onCenterChanged}
          onDragEnd={this.onDragEnd}
          onAddLocation={this.onAddLocation}
        />
      </div>
    );
  }
}

InputMap.propTypes = {
  value: React.PropTypes.string,
  inputProps: React.PropTypes.object,
  onMarkerClick: React.PropTypes.func,
  onPlacesChanged: React.PropTypes.func
};
