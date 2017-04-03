import { Link } from 'react-router';
import React from 'react';
import Nav from 'components/ui/Nav';
import classnames from 'classnames';
import links from 'constants/links';

export default function Header() {
  const cNames = {
    header: classnames('c-header', { '-home': window.location.pathname === '/' }),
    nav: classnames('header-nav', { '-home': window.location.pathname === '/' })
  };

  return (
    <header className={cNames.header} role="banner">
      <div className="header-content l-app-wrapper">
        <Link className="logo" to="/">The Nature of Risk Reduction</Link>
        <Nav className={cNames.nav} links={links} />
      </div>
    </header>
  );
}
