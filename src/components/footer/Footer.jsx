import React from 'react';
import Nav from 'components/ui/Nav';
import footerLinks from './footer-links-constants';

export default function Footer() {
  return (
    <footer className="c-footer" role="banner">
      <div className="footer-content l-app-wrapper">
        <div className="copy">© 2017 Natural Hazards – Nature-based Solutions. All Rights Reserved.</div>
        <Nav className="c-nav -footer" links={footerLinks} />
      </div>
    </footer>
  );
}
