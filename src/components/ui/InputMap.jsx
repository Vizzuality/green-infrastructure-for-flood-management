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

const SearchBoxGoogleMap = withGoogleMap(props => {
  return (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={15}
      center={props.center}
      onBoundsChanged={props.onBoundsChanged}
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
        <Marker position={marker.position} key={index} onClick={props.onMarkerClick} clickable />
      ))}
    </GoogleMap>);
});


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
      value: props.inputProps && props.inputProps.value
    };

    // BINDINGS
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.inputProps.value !== this.state.value &&
      this.setState({ value: nextProps.inputProps.value });
  }

  /**
   * UI EVENTS
   * - onChange
  */
  handleMapMounted(map) {
    this._map = map;
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter()
    });
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();
    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location
    }));

    this.props.onPlacesChanged(places);
    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
      markers
    });
  }

  render() {
    const inputProps = Object.assign({}, this.props.inputProps, { value: this.state.value });

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
          onMapMounted={this.handleMapMounted}
          onBoundsChanged={this.handleBoundsChanged}
          onSearchBoxMounted={this.handleSearchBoxMounted}
          bounds={this.state.bounds}
          onPlacesChanged={this.handlePlacesChanged}
          markers={this.state.markers}
          inputProps={inputProps}
          onMarkerClick={this.props.onMarkerClick}
        />
      </div>
    );
  }
}

InputMap.propTypes = {
  // name: React.PropTypes.string,
  value: React.PropTypes.string
  // label: React.PropTypes.string,
  // className: React.PropTypes.string,
  // checked: React.PropTypes.bool,
  // onChange: React.PropTypes.func
};