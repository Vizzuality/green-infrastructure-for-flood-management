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

  onToggle(opened) {
    const size = opened ? this.el.clientWidth : 0;
    this.props.onToggle && this.props.onToggle(size);
  }

  setContentScroll(scroll) {
    this.elContent.scrollTop = scroll;
  }

  toggle() {
    const opened = !this.state.opened;
    this.setState({ opened });
    this.onToggle(opened);
  }

  render() {
    const cNames = classnames('c-sidebar', { '-opened': this.state.opened }, { [this.props.className]: this.props.className });
    const contentCNames = classnames('sidebar-content', { '-no-scroll': this.props.filtersOpened && !this.props.onDetail });
    return (
      <aside ref={node => this.el = node} className={cNames}>
        {this.props.showBtn && <button type="button" className="sidebar-btn" onClick={this.toggle}>
          <SvgIcon name={this.state.opened ? 'icon-arrow-left-2' : 'icon-arrow-right-2'} />
        </button>}
        <div ref={node => this.elContent = node} className={contentCNames}>
          {this.props.children}
        </div>
        <div className="sidebar-closed">
          {!this.props.onDetail ?
            <div className="rotate-list">
              <ul>
                <li onClick={() => this.toggle()}>Projects list</li>
                <li onClick={() => { this.toggle(); this.props.actions.focusSearch(); }}>Search</li>
                <li onClick={() => this.toggle()}>Sort by</li>
                <li onClick={() => { this.toggle(); this.props.actions.openFilters(); }}>Filter</li>
              </ul>
              <button
                className="c-btn -transparent"
                onClick={() => saveAsFile('https://nature-of-risk-reduction.vizzuality.com/downloads/projects', 'projectsList.csv')}
              >
                Download data
              </button>
            </div> :
            <div className="rotate-list">
              <ul>
                <li onClick={() => this.toggle()}>Project detail</li>
              </ul>
              <button
                className="c-btn -transparent"
                onClick={() => saveAsFile('https://nature-of-risk-reduction.vizzuality.com/downloads/project', 'projectDetail.pdf')}
              >
                Download Pdf
              </button>
            </div>
          }
        </div>
      </aside>
    );
  }
}

Sidebar.propTypes = {
  opened: React.PropTypes.bool,
  onDetail: React.PropTypes.bool,
  filtersOpened: React.PropTypes.bool,
  showBtn: React.PropTypes.bool,
  actions: React.PropTypes.object,
  className: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  scroll: React.PropTypes.number,
  onToggle: React.PropTypes.func
};
