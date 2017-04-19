import React from 'react';
import { Link } from 'react-router';
import { Row } from 'components/ui/Grid';
import { SvgIcon } from 'vizz-components';
import BtnGroup from 'components/ui/BtnGroup';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        {/* Heading section */}
        <section className="home-section -header">
          <div className="l-app-wrapper">
            <div className="section-wrapper">
              <h1 className="h1 -secondary -big">The Nature of Risk Reduction</h1>
              <h2 className="h2">Learn about nature-based projects for disaster risk reduction, and explore implementation and guiding principles to make your next project a success</h2>
              <BtnGroup>
                <Link className="c-btn -fixed -tertiary" to="/map">Go to the map</Link>
                <Link className="c-btn -fixed -transparent">Guidance</Link>
              </BtnGroup>
              <SvgIcon className="section-icon" name="icon-arrow-down-2" />
            </div>
          </div>
        </section>
        {/* Projects */}
        <section className="home-section -grayed">
          <div className="l-app-wrapper">
            <Row>
              <div className="small-6">
                <h1 className="h1 -line">Learn about nature-based projects</h1>
                <p className="text">The project map provides a list of nature-based projects that are sortable by implementing organization, targeted hazard, type of nature-based solution, geographic location, cost, benefits, and more.</p>
                <Link className="c-btn -secondary" to="/map">See all projects</Link>
              </div>
              <div className="small-6 -container">
                <img className="screenshot" alt="screen capture" src="/images/screenshot.png" />
              </div>
            </Row>
          </div>
        </section>
        {/* Guidance */}
        <section className="home-section -dark">
          <div className="l-app-wrapper">
            <Row>
              <div className="small-6">
                <h1 className="h1 -secondary -line">Guidance</h1>
              </div>
              <div className="small-6">
                <p className="text -secondary">Nature-based measures necessitate a distinct set of considerations different than those used in traditional infrastructure projects. These guidelines are intended to help practitioners succeed in designing and implementing nature-based solutions successfully.</p>
                <Link className="c-btn -tertiary">Explore project guidance</Link>
              </div>
            </Row>
          </div>
        </section>
        {/* Submit */}
        <section className="home-section -submit">
          <div className="l-app-wrapper">
            <Row>
              <div className="small-6">
                <h1 className="h1 -secondary -line">Submit your project</h1>
                <p className="text -secondary">Contribute your nature-based project and experiences to The Nature of Risk Reduction database, and join a growing community of practitioners, scientists and donors who are using nature-based approaches to reduce disaster risk.</p>
                <Link to="/submit" className="c-btn -primary">Submit a project</Link>
              </div>
            </Row>
          </div>
        </section>
        {/* Partners */}
        <section className="home-section">
          <div className="l-app-wrapper">
            <h1 className="h1 -line">Partners</h1>
            <div className="c-partners">
              <li><img src="/images/partners/deltares.png" alt="deltares" /></li>
              <li><img src="/images/partners/wbg.png" alt="wbg" /></li>
              <li><img src="/images/partners/gfdrr.png" alt="gfdrr" /></li>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

HomePage.propTypes = {};
HomePage.defaultProps = {};
