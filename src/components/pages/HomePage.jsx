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
              <h1 className="h1 -secondary -big">Natural Hazards – Nature-based Solutions</h1>
              <h2 className="h2">Learn about nature-based projects for disaster risk reduction, and explore implementation and guiding principles to make your next project a success</h2>
              <BtnGroup>
                <Link className="c-btn -fixed -tertiary" to="/map">Go to the map</Link>
                <Link className="c-btn -fixed -transparent" to="/guidance">Guidance</Link>
              </BtnGroup>
              <SvgIcon className="section-icon is-mobile-hidden" name="icon-arrow-down-2" />
            </div>
          </div>
        </section>
        {/* Projects */}
        <section className="home-section -grayed">
          <div className="l-app-wrapper">
            <Row>
              <div className="column large-5 small-12">
                <h1 className="h1 -line">Learn about nature-based projects</h1>
                <p className="text">The project map provides a list of nature-based projects that are sortable by implementing organization, targeted hazard, type of nature-based solution, geographic location, cost, benefits, and more.</p>
                <Link className="c-btn -secondary" to="/map">See all projects</Link>
              </div>
              <div className="column large-6 small-12 -container is-mobile-hidden">
                <Link to="/map">
                  <img className="screenshot" alt="screen capture" src="/images/projects-page.png" />
                </Link>
              </div>
            </Row>
          </div>
        </section>
        {/* Guidance */}
        <section className="home-section -dark">
          <div className="l-app-wrapper">
            <Row>
              <div className="column large-6 small-12">
                <h1 className="h1 -secondary -line">Guidance</h1>
              </div>
              <div className="column large-6 small-12">
                <p className="text -secondary">Nature-based measures necessitate a distinct set of considerations different than those used in traditional infrastructure projects. These guidelines are intended to help practitioners succeed in designing and implementing nature-based solutions successfully.</p>
                <Link className="c-btn -tertiary" to="/guidance">Explore project guidance</Link>
              </div>
            </Row>
          </div>
        </section>
        {/* Submit */}
        <section className="home-section -submit">
          <div className="l-app-wrapper">
            <Row>
              <div className="column large-6 small-12">
                <h1 className="h1 -secondary -line">Submit your project</h1>
                <p className="text -secondary">Contribute your nature-based project and experiences to Natural Hazards – Nature-based Solutions database, and join a growing community of practitioners, scientists and donors who are using nature-based approaches to reduce disaster risk.</p>
                <Link to="/submit" className="c-btn -primary">Submit a project</Link>
              </div>
            </Row>
          </div>
        </section>
        {/* Partners */}
        <section className="home-section -partners">
          <div className="l-app-wrapper">
            <div className="c-partners">
              <li>
                <a href="https://www.deltares.nl/en/" target="_blank" rel="noreferrer noopener">
                  <img src="/images/partners/deltares.png" alt="deltares" />
                </a>
              </li>
              <li>
                <a href="http://www.worldbank.org/" target="_blank" rel="noreferrer noopener">
                  <img src="/images/partners/wb.png" alt="wbg" style={{ opacity: 0.65 }} />
                </a>
              </li>
              <li>
                <a href="https://www.gfdrr.org/" target="_blank" rel="noreferrer noopener">
                  <img src="/images/partners/gfdrr.png" alt="gfdrr" />
                </a>
              </li>
            </div>

            <h1 className="subpartners-title h1 -line">Contributing partners</h1>
            <div className="c-partners -contributors">
              <li>
                <a href="https://www.wetlands.org/" target="_blank" rel="noreferrer noopener">
                  <img src="/images/partners/wetlands.png" alt="wetlands" />
                </a>
              </li>
              <li>
                <a href="https://www.ecoshape.org/en/" target="_blank" rel="noreferrer noopener">
                  <img src="/images/partners/ecoshape.png" alt="ecoshape" />
                </a>
              </li>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

HomePage.propTypes = {};
HomePage.defaultProps = {};
