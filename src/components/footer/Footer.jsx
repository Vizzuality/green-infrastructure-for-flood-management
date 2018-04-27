import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from 'react-share';
import Nav from 'components/ui/Nav';
import footerLinks from './footer-links-constants';

export default function Footer() {
  return (
    <footer className="c-footer" role="banner">
      <div className="footer-content-social l-app-wrapper">
        <div className="social-links">
          <FacebookShareButton url={window.location.href}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={window.location.href}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <LinkedinShareButton url={window.location.href}>
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
        </div>
      </div>
      <div className="footer-content l-app-wrapper">
        <div className="copy">© 2017 Natural Hazards – Nature-based Solutions. All Rights Reserved.</div>
        <Nav className="c-nav -footer" links={footerLinks} />
      </div>
    </footer>
  );
}
