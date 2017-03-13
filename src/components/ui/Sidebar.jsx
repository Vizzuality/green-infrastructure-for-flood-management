import React from 'react';

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

        </button>
        <div className="sidebar-content">
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
  ])
};
