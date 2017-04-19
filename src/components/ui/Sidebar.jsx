import React from 'react';
import { SvgIcon } from 'vizz-components';
import classnames from 'classnames';
import { saveAsFile } from 'utils/general';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    // Initial state
    const opened = isNaN(props.opened) ? true : props.opened;
    this.state = { opened };

    // Bindings
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    // Toggle initial sidebar state
    this.onToggle(this.state.opened);
  }

  componentWillReceiveProps(newProps) {
    if (this.elContent.scrollTop !== newProps.scroll) {
      this.setContentScroll(newProps.scroll);
    }
  }

  setContentScroll(scroll) {
    this.elContent.scrollTop = scroll;
  }

  onToggle(opened) {
    const size = opened ? this.el.clientWidth : 0;
    this.props.onToggle && this.props.onToggle(size);
  }

  toggle() {
    const opened = !this.state.opened;
    this.setState({ opened });
    this.onToggle(opened);
  }

  render() {
    const cNames = classnames('c-sidebar', { '-opened': this.state.opened });
    const contentCNames = classnames('sidebar-content', { '-no-scroll': this.props.filtersOpened });
    return (
      <aside ref={node => this.el = node} className={cNames}>
        <div ref={node => this.elContent = node} className={contentCNames}>
          {this.props.showBtn && <button type="button" className="sidebar-btn" onClick={this.toggle}>
            <SvgIcon name={this.state.opened ? 'icon-arrow-left-2' : 'icon-arrow-right-2'} />
          </button>}
          {this.props.children}
        </div>
        <div className="sidebar-closed">
          <button type="button" className="sidebar-btn -relative" onClick={this.toggle}>
            <SvgIcon name={this.state.opened ? 'icon-arrow-left-2' : 'icon-arrow-right-2'} />
          </button>
          <div className="rotate-list">
            <ul>
              <li onClick={() => this.toggle()}>Projects list</li>
              <li onClick={() => { this.toggle(); this.props.actions.focusSearch(); }}>Search</li>
              <li onClick={() => { this.toggle(); this.props.actions.openFilters(); }}>Filter / Sort by</li>
            </ul>
            <button
              className="c-btn -transparent"
              onClick={() => saveAsFile('http://nature-of-risk-reduction.vizzuality.com/downloads/projects', 'projectsList.csv')}
            >
              Download data
            </button>
          </div>
        </div>
      </aside>
    );
  }
}

Sidebar.propTypes = {
  opened: React.PropTypes.bool,
  filtersOpened: React.PropTypes.bool,
  actions: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  scroll: React.PropTypes.number,
  onToggle: React.PropTypes.func
};
