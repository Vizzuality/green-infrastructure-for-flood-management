import { Link } from 'react-router';
import React from 'react';
import Nav from 'components/ui/Nav';
import classnames from 'classnames';
import links from 'constants/links';
import OnlyOn from 'components/ui/Responsive';

export default function Header(props) {
  const cNames = {
    header: classnames('c-header', { '-home': window.location.pathname === '/' }),
    nav: classnames('header-nav', { '-home': window.location.pathname === '/' }),
    headerContent: classnames('header-content', { 'l-app-wrapper': !window.location.pathname.startsWith('/map') })
  };

  return (
    <header className={cNames.header} role="banner">
      <div className={cNames.headerContent}>
        <Link className="logo" to="/">The Nature of Risk Reduction</Link>
        <OnlyOn device="desktop">
          <Nav className={cNames.nav} links={links} logged={props.logged} />
        </OnlyOn>
      </div>
    </header>
  );
}

Header.propTypes = {
  logged: React.PropTypes.bool
};
