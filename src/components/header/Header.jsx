import { Link } from 'react-router';
import React from 'react';
import Nav from 'components/ui/Nav';
import classnames from 'classnames';

export default function Header() {
  const links = [
    {
      text: 'Map of global projects',
      href: '/map'
    },
    {
      text: 'Resources',
      href: '/resources'
    },
    {
      text: 'Submit',
      href: '/submit'
    },
    {
      text: 'About',
      href: '/about'
    }
  ];

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
