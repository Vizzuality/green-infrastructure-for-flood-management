import React from 'react';
import Nav from 'components/ui/Nav';
import footerLinks from './footer-links-constants';

export default function Footer() {
  return (
    <footer className="c-footer" role="banner">
      <div className="footer-content l-app-wrapper">
        <Nav className="c-nav -footer" links={footerLinks} />
      </div>
    </footer>
  );
}
