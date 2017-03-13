import React from 'react';
import classnames from 'classnames';

export default class ZoomControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = { zoom: props.zoom };

    // Bindings
    this.increaseZoom = this.increaseZoom.bind(this);
    this.decreaseZoom = this.decreaseZoom.bind(this);
  }

  setZoom(zoom) {
    this.setState({ zoom });
    this.props.onZoomChange && this.props.onZoomChange(zoom);
  }

  increaseZoom() {
    if (this.state.zoom === this.props.maxZoom) return;
    this.setZoom(this.state.zoom + 1);
  }

  decreaseZoom() {
    if (this.state.zoom === this.props.minZoom) return;
    this.setZoom(this.state.zoom - 1);
  }

  render() {
    const zoomInClass = classnames('zoom-control-btn', {
      '-disabled': this.state.zoom === this.props.maxZoom
    });

    const zoomOutClass = classnames('zoom-control-btn', {
      '-disabled': this.state.zoom === this.props.minZoom
    });

    return (
      <ul className="c-zoom-control">
        <li className="zoom-control-item">
          <button className={zoomOutClass} type="button" onClick={this.decreaseZoom}>-</button>
        </li>
        <li className="zoom-control-item">
          <button className={zoomInClass} type="button" onClick={this.increaseZoom}>+</button>
        </li>
      </ul>
    );
  }
}

ZoomControl.propTypes = {
  zoom: React.PropTypes.number,
  maxZoom: React.PropTypes.number,
  minZoom: React.PropTypes.number,
  onZoomChange: React.PropTypes.func
};

ZoomControl.defaultProps = {
  zoom: 3,
  maxZoom: 9,
  minZoom: 2
};
