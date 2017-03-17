import React from 'react';
import { SvgIcon } from 'vizz-components';
import classnames from 'classnames';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      opened: isNaN(props.opened) ? true : props.opened
    };

    // Bindings
    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.elContent.scrollTop !== newProps.scroll) {
      this.setContentScroll(newProps.scroll);
    }
  }

  setContentScroll(scroll) {
    this.elContent.scrollTop = scroll;
  }

  toggle() {
    this.setState({
      opened: !this.state.opened
    });
  }

  render() {
    const cNames = classnames('c-sidebar', { '-opened': this.state.opened });
    return (
      <aside className={cNames}>
        <button type="button" className="sidebar-btn" onClick={this.toggle}>
          <SvgIcon name={this.state.opened ? 'icon-arrow-left-2' : 'icon-arrow-right-2'} />
        </button>
        <div ref={node => this.elContent = node} className="sidebar-content">
          {this.props.children}
        </div>
      </aside>
    );
  }
}

Sidebar.propTypes = {
  opened: React.PropTypes.bool,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  scroll: React.PropTypes.number
};
