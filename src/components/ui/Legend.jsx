import React from 'react';
import Switch from 'react-toggle-switch';
import 'react-toggle-switch/dist/css/switch.min.css';
import classnames from 'classnames';
import TetherComponent from 'react-tether';
import { SvgIcon } from 'vizz-components';

import { dispatch } from 'main';
import { toggleLayer } from 'modules/map';

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
      open: true,
      legendInfoOpen: false
    };
    // BINDINGS
    this.onClickOpen = this.onClickOpen.bind(this);
    this.toggleDataDropdown = this.toggleDataDropdown.bind(this);
    this.onScreenClick = this.onScreenClick.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onScreenClick);
  }

  onScreenClick(e) {
    const el = document.querySelector('.c-dropdown');
    const clickOutside = el && el.contains && !el.contains(e.target);
    const isOrganizationsBtn = this.organizationsBtn && this.organizationsBtn.contains(e.target);
    const isCountriesBtn = this.countriesBtn && this.countriesBtn.contains(e.target);

    if (clickOutside) {
      (!isOrganizationsBtn) ? this.toggleDataDropdown(e, 'legendInfoOpen', true) : null;
    }
  }

  toggleDataDropdown(e, specificDropdown, to) {
    const { legendInfoOpen } = this.state;

    if (specificDropdown === 'legendInfoOpen') {
      this.setState({
        legendInfoOpen: to ? false : !legendInfoOpen
      });
    } else {
      this.setState({
        legendInfoOpen: false
      });
    }

    requestAnimationFrame(() => {
      window[!this.state[specificDropdown] ?
        'removeEventListener' : 'addEventListener']('click', this.onScreenClick, true);
    });
  }

  onClickOpen() {
    this.setState({ open: !this.state.open });
  }

  onShowLayer(id) {
    dispatch(toggleLayer(id));
  }

  render() {
    const classNames = classnames(
      'c-legend',
      { [this.props.className]: !!this.props.className },
      { '-hidden': !this.state.open }
    );

    return (
      <div className={classNames}>
        <div className="header">
          <h1 className="title">
            <span>
              Legend
              <TetherComponent
                attachment="bottom right"
                targetAttachment="top right"
                constraints={[{
                  to: 'scrollParent',
                  attachment: 'together',
                  pin: true
                }]}
                classes={{
                  element: 'c-dropdown -arrow-bottom -arrow-right -legend-info'
                }}
              >
                <button className="info project-company -drop" type="button" onClick={e => this.toggleDataDropdown(e, 'legendInfoOpen')} ref={c => this.legendInfoBtn = c}>
                  <SvgIcon name="icon-info" className="-small" />
                </button>
                {
                  this.state.legendInfoOpen &&
                  <div className="content -info">
                    <p>The flood hazard maps show inundation depth in case of extreme river and coastal flooding.</p>
                    <p>
                      River flood data is derived from the GLOFRIS model, and available through the WRI Global Flood Analyzer:
                      <a href="http://floods.wri.org/" target="_blank">http://floods.wri.org/</a>.
                    </p>
                    <p>Coastal flood data is derived from the GTSR model:
                      <a href="https://www.nature.com/articles/ncomms11969" target="_blank">https://www.nature.com/articles/ncomms11969</a>.
                    </p>
                  </div>
                }
              </TetherComponent>
            </span>
            <button onClick={this.onClickOpen}>
              <SvgIcon name="icon-arrow-down-2" className="close -medium" />
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

          <div className={`layers ${this.props.layersActive.includes('layer1') ? '-active' : ''}`}>
            <div className="layers-header">
              <Switch
                onClick={() => this.onShowLayer('layer1')}
                on={this.props.layersActive.includes('layer1')}
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
  layersActive: React.PropTypes.array
};
