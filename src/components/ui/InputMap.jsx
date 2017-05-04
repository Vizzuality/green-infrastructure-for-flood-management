/* global google */
import React from 'react';

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps/lib';
import SearchBox from 'react-google-maps/lib/places/SearchBox';

const INPUT_STYLE = {
  boxSizing: 'border-box'
  // MozBoxSizing: 'border-box',
  // border: '1px solid transparent',
  // width: '240px',
  // height: '32px',
  // marginTop: '27px',
  // padding: '0 12px',
  // borderRadius: '1px',
  // boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  // fontSize: '14px',
  // outline: 'none',
  // textOverflow: 'ellipses'
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
      inputPlaceholder="Type a location"
      inputStyle={INPUT_STYLE}
      inputProps={props.inputProps}
    />
    {props.markers.map((marker, index) => (
      <Marker
        position={marker.position}
        key={index}
        onClick={props.onMarkerClick}
      />
    ))}
  </GoogleMap>)
);


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
    const { markers } = this.state;
    const position = true;
    const value = `${markers[0].position.lat()}, ${markers[0].position.lng()}`;

    if (markers && markers.length) {
      this.setState({ value });
      this.props.onMarkerClick(markers[0], position);
    }
  }

  onSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  onPlacesChanged() {
    const places = this._searchBox.getPlaces();
    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location
    }));

    this.props.onPlacesChanged(places);
    // Set markers; set map center to first search result
    const mapMarkerCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapMarkerCenter,
      markers
    });
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
          onMarkerClick={this.props.onMarkerClick}
          onCenterChanged={this.onCenterChanged}
          onDragEnd={this.onDragEnd}
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
