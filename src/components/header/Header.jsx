import { Link } from 'react-router';
import React from 'react';
import Nav from 'components/ui/Nav';
import classnames from 'classnames';
import links from 'constants/links';
import OnlyOn from 'components/ui/Responsive';
import { toggleMobileMenu } from 'modules/ui';
import { connect } from 'react-redux';

function Header(props) {
  const cNames = {
    header: classnames('c-header', { '-home': window.location.pathname === '/' }),
    nav: classnames('header-nav', { '-home': window.location.pathname === '/' }),
    headerContent: classnames('header-content', { 'l-app-wrapper': !window.location.pathname.startsWith('/map') }),
    hamburger: classnames('hamburger', 'hamburger--collapse', { 'is-active': props.mobileMenu.opened })
  };

  return (
    <header className={cNames.header} role="banner">
      <div className={cNames.headerContent}>
        <Link className="logo" to="/">The Nature of Risk Reduction</Link>
        <OnlyOn device="desktop">
          <Nav className={cNames.nav} links={links} logged={props.logged} />
        </OnlyOn>
        <button onClick={() => props.dispatch(toggleMobileMenu(!props.mobileMenu.opened))} className={cNames.hamburger} type="button">
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  logged: React.PropTypes.bool,
  mobileMenu: React.PropTypes.object,
  dispatch: React.PropTypes.func
};

const mapStateToProps = ({ ui }) => ({
  mobileMenu: ui.mobileMenu
});

export default connect(mapStateToProps)(Header);
