import React from 'react';
import Nav from 'components/ui/Nav';
import links from 'constants/links';

export default function Footer() {
  return (
    <footer className="c-footer" role="banner">
      <div className="footer-content l-app-wrapper">
        <Nav className="c-nav -footer" links={links} />
      </div>
    </footer>
  );
}
