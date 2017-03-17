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

  toggle() {
    this.setState({
      closed: !this.state.closed
    });
  }

  render() {
    const cNames = classnames('c-sliding-menu', {
      '-closed': this.state.closed
    });
    return (
      <div className={cNames}>
        <div className="sliding-menu-content">{this.props.children}</div>
        <div className="sliding-menu-header">
          <button className="sliding-menu-btn" onClick={this.toggle} type="button">
            <SvgIcon className="sliding-menu-icon" name={this.state.closed ? 'icon-arrow-down-2' : 'icon-arrow-up-2'} />
            {this.props.title}
          </button>
        </div>
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
