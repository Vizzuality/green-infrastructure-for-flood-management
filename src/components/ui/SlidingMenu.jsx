import React from 'react';
import { SvgIcon } from 'vizz-components';
import classnames from 'classnames';

export default class SlidingMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      closed: props.closed
    };

    // Bindings
    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(newProps) {
    newProps.closed !== this.state.closed &&
      this.setState({ closed: newProps.closed })
  }

  toggle() {
    this.setState({
      closed: !this.state.closed
    });
  }

  getChildContext() {
    return { toggleFilters: this.toggle };
  }

  render() {
    const cNames = classnames('c-sliding-menu', {
      '-closed': this.state.closed
    });

    return (
      <div className={cNames}>
        <div className="sliding-menu-header">
          <button className="sliding-menu-btn" onClick={this.toggle} type="button">
            {this.props.title}
            <SvgIcon className="sliding-menu-icon -small" name={this.state.closed ? 'icon-arrow-down-2' : 'icon-arrow-up-2'} />
          </button>
        </div>
        <div className="sliding-menu-content">{this.props.children}</div>
      </div>
    );
  }
}

SlidingMenu.propTypes = {
  closed: React.PropTypes.bool,
  children: React.PropTypes.any,
  title: React.PropTypes.string
};

SlidingMenu.defaultProps = {
  closed: true
};

// make information available to its children
SlidingMenu.childContextTypes = {
  toggleFilters: React.PropTypes.func
};
