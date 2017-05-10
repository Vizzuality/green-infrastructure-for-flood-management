import React from 'react';
import { Link } from 'react-router';
import { Row } from 'components/ui/Grid';
import { SvgIcon } from 'vizz-components';
import BtnGroup from 'components/ui/BtnGroup';

export default class AboutPage extends React.Component {
  render() {
    return (
      <div className="c-about">
        {/* Heading section */}
        <section className="home-section -header header">
          <div className="l-app-wrapper">
            <Row>
              <div className="column small-12">
                <h1 className="h1 -secondary -line">About us</h1>
              </div>
            </Row>
            <Row>
              <div className="column small-12 medium-8">
                <p className="intro-text">The Nature of Risk Reduction platform is a hub for projects, investments, guidance and studies making use of nature to reduce the risks associated with natural hazards. Our objective is to host and facilitate the exchange of knowledge, experiences and lessons learned from a range of stakeholders, to provide guidance on the planning and implementation of nature-based solutions, and to champion these solutions in the arenas of policy-making and investment for disaster risk reduction.</p>
                <p className="intro-text">The guidance was developed and agreed upon by of leading international institutions who are engaged in designing, planning, financing and/or implementing nature-based solutions around the world. The platform was developed by the World Bank Group, the Global Facility for Disaster Reduction and Recovery (GFDRR), and Deltares.</p>
              </div>
            </Row>
          </div>
        </section>

        {/* Partners */}
        <section className="home-section -grayed partners">
          <div className="l-app-wrapper">
            <h1 className="h1 -line">Who we are</h1>
            <Row>
              <div className="column small-12 medium-4 partner">
                <div className="logo">
                  <a
                    href="http://www.worldbank.org/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <img src="/images/partners/wbg.png" alt="wbg" />
                  </a>
                </div>
                <p>The World Bank Group is a multilateral organization comprised of five institutions, which collectively serve as a vital source of financial and technical assistance to developing countries.</p>
              </div>

              <div className="column small-12 medium-4 partner">
                <div className="logo">
                  <a
                    href="https://www.gfdrr.org/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <img src="/images/partners/gfdrr.png" alt="gfdrr" />
                  </a>
                </div>
                <p>GFDRR is a global partnership, hosted by the World Bank Group, that helps developing countries better understand and reduce their vulnerability to natural hazards and climate change.</p>
              </div>

              <div className="column small-12 medium-4 partner">
                <div className="logo">
                  <a
                    href="https://www.deltares.nl/en/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <img src="/images/partners/deltares.png" alt="deltares" />
                  </a>
                </div>
                <p>Deltares is an independent institute for applied research in the field of water and subsurface working on smart solutions, innovations and applications for people, environment and society in deltas, coastal regions and river basins.</p>
              </div>
            </Row>
          </div>
        </section>

        {/* Submit */}
        <section className="home-section -submit">
          <div className="l-app-wrapper">
            <Row>
              <div className="column small-12 medium-8">
                <h1 className="h1 -secondary -line">Submit your project</h1>
              </div>
            </Row>
            <Row>
              <div className="column small-12 medium-6">
                <p className="text -secondary">Contribute your nature-based project and experiences to The Nature of Risk Reduction database, and join a growing community of practitioners, scientists and donors who are using nature-based approaches to reduce disaster risk.</p>
                <Link to="/submit" className="c-btn -primary">Submit a project</Link>
              </div>
            </Row>
          </div>
        </section>
      </div>
    );
  }
}

AboutPage.propTypes = {};
AboutPage.defaultProps = {};
