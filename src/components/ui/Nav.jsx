import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import { dispatch } from 'main';
import { logout } from 'modules/user';


export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.onClickLogout = this.onClickLogout.bind(this);
  }

  onClickLogout() {
    dispatch(logout());
  }

  render() {
    const cNames = classnames(
      'c-nav',
      'header-nav',
      { [this.props.className]: !!this.props.className }
    );

    return (
      <nav className={cNames} role="navigation">
        <ul className="nav-list">
          {
            this.props.links.map((l, i) => {
              return (
                <li className="nav-item" key={i}>
                  <Link activeClassName="-active" className="nav-link" to={l.href} onClick={this.props.onClick}>{l.text}</Link>
                </li>
              );
            })
          }
          {this.props.logged &&
            <li className="nav-item">
              <a className="nav-link" onClick={this.onClickLogout}>
                Sing out
              </a>
            </li>
          }
        </ul>
      </nav>
    );
  }
}

Nav.propTypes = {
  links: React.PropTypes.array,
  className: React.PropTypes.string,
  logged: React.PropTypes.bool,
  onClick: React.PropTypes.func
};

Nav.defaultProps = {
  links: []
};
