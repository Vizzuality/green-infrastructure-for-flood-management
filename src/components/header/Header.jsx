import { Link } from 'react-router';
import React from 'react';
import Nav from 'components/ui/Nav';
import classnames from 'classnames';
import links from 'constants/links';
import OnlyOn from 'components/ui/Responsive';
import { toggleMobileMenu } from 'modules/ui';
import { connect } from 'react-redux';
import Hamburger from 'react-hamburgers';

function Header(props) {
  const cNames = {
    header: classnames('c-header', { '-home': props.path === '/' }),
    nav: classnames('header-nav', { '-home': props.path === '/' }),
    headerContent: classnames('header-content', { 'l-app-wrapper': !props.path.startsWith('/map') }),
    hamburger: classnames('hamburger', 'hamburger--collapse', { 'is-active': props.mobileMenu.opened })
  };

  return (
    <header className={cNames.header} role="banner">
      <div className={cNames.headerContent}>
        <Link className="logo" to="/">Natural Hazards – Nature-based Solutions</Link>
        <OnlyOn device="desktop">
          <Nav className={cNames.nav} links={links} logged={props.logged} />
        </OnlyOn>
        <Hamburger
          type="collapse"
          onClick={() => props.dispatch(toggleMobileMenu(!props.mobileMenu.opened))}
          active={props.mobileMenu.opened}
        />
      </div>
    </header>
  );
}

Header.propTypes = {
  logged: React.PropTypes.bool,
  mobileMenu: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  path: React.PropTypes.string
};

const mapStateToProps = ({ ui }) => ({ mobileMenu: ui.mobileMenu });

export default connect(mapStateToProps)(Header);
