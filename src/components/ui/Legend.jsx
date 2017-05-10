import React from 'react';
import Switch from 'react-toggle-switch';
import 'react-toggle-switch/dist/css/switch.min.css';
import { SvgIcon } from 'vizz-components';

const legendConfig = [
  { color: '#d9e6f9', value: '0.1' },
  { color: '#9ab6f3', value: '1' },
  { color: '#508ee9', value: '3' },
  { color: '#8d5cd7', value: '5' },
  { color: '#c53e7d', value: '7' },
  { color: '#6a114b', value: '8' },
  { color: '#2e0934', value: '9' },
  { color: '#000000', value: '10' }
];

export default class Legend extends React.Component {

  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      open: true
    };
    // BINDINGS
    this.onClickOpen = this.onClickOpen.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  // }

  /**
   * UI EVENTS
   * - onClickOpen
  */

  onClickOpen() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const classNames = `c-legend ${this.props.className ? this.props.className : ''}${!this.state.open ? ' -hidden' : ''}`;

    return (
      <div className={classNames}>
        <div className="header">
          <h1 className="title">
            Legend
            <button onClick={this.onClickOpen}>
              <SvgIcon name="icon-arrow-down-2" className="-medium" />
            </button>
          </h1>
        </div>

        <div className="content">
          <div className="clusters">
            <ul className="list">
              <li className="legend-item">
                <div className="icon">
                  <span className="project-icon" />
                </div>
                <p>Projects</p>
              </li>
              <li className="legend-item">
                <div className="icon">
                  <span className="centroid-icon" />
                </div>
                <p>Locations centroid</p>
              </li>
              <li className="legend-item">
                <div className="icon">
                  <span className="location-icon" />
                </div>
                <p>Current project location </p>
              </li>
            </ul>
          </div>

          <div className={`layers ${this.props.layerActive ? '-active' : ''}`}>
            <div className="layers-header">
              <Switch
                // onClick={this.onChangeCostSwitch}
                // on={!this.state.cost.disabled}
                className="c-switch"
              />
              Potential river and coastal flood inundation
            </div>
            <div className="layer-spec">
              <div className="legend-colors">
                {legendConfig.map((l, i) => (
                  <span key={i} className="square" style={{ background: l.color }} data-value={l.value} />
                ))}
                <span className="mark" data-value="M" />
              </div>
              <div className="arrow">
                <SvgIcon name="icon-large-arrow" className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Legend.propTypes = {
  className: React.PropTypes.bool,
  layerActive: React.PropTypes.bool
};
