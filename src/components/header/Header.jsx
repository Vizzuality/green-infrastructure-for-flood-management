import { Link } from 'react-router';
import React from 'react';
import Nav from 'components/ui/Nav';

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
  return (
    <header className="c-header" role="banner">
      <div className="header-content l-app-wrapper">
        <Link to="/">Logo</Link>
        <Nav className="header-nav" links={links} />
      </div>
    </header>
  );
}
