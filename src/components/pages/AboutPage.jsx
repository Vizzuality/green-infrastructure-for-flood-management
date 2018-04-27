import React from 'react';
import { Link } from 'react-router';
import isEqual from 'lodash/isEqual';
import validator from 'validator';
// This import the validation rules, do not remove
import { validation } from 'utils/validation';
import { replace } from 'react-router-redux';
import Validation from 'react-validation';

import { Row } from 'components/ui/Grid';
import Spinner from 'components/ui/Spinner';
import Message from 'components/ui/Message';
import { Form, Input } from 'components/form/Form';

export default class AboutPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { error: null };

    this.form = {};

    // Bindings
    this.onContact = this.onContact.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    this.form[e.target.name] = e.target.value;
  }

  onContact(e) {
    e.preventDefault();
    if (this.form.email && validator.isEmail(this.form.email) &&
      this.form.name && this.form.name !== '' &&
      this.form.message && this.form.message !== '') {
      // Contact
      this.props.contact(this.form);
      this.setState({ error: null });
    } else if (this.form.email && !validator.isEmail(this.form.email)) {
      this.setState({ error: 'The email is not correct' });
    } else {
      this.setState({ error: 'Some required fields are missing' });
    }
  }

  setMessageText() {
    const { success } = this.props;
    let message = '';
    let type = '';

    if (this.state.error) {
      message = this.state.error;
      type = 'error';
    } else {
      message = success ? 'Your message has been sent successfully' : 'The message could not be sent. Try again';
      type = success ? 'success' : 'error';
    }
    return { message, type };
  }

  render() {
    const { success, error } = this.props;
    const message = this.setMessageText();

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
                <p className="intro-text">The Natural Hazards – Nature-based Solutions platform is a hub for projects, investments, guidance and studies making use of nature to reduce the risks associated with natural hazards. Our objective is to host and facilitate the exchange of knowledge, experiences and lessons learned from a range of stakeholders, to provide guidance on the planning and implementation of nature-based solutions, and to champion these solutions in the arenas of policy-making and investment for disaster risk reduction.</p>
                <p className="intro-text">The guidance was developed and agreed upon by a group of leading international institutions who are engaged in designing, planning, financing and/or implementing nature-based solutions around the world. The platform was developed by the World Bank, the Global Facility for Disaster Reduction and Recovery (GFDRR), and Deltares.</p>
                <p className="intro-text -title">About nature-based solutions</p>
                <p className="intro-text">Most disaster risk management involved conventional engineering measures. These measures are sometimes referred to as “hard” engineering or “gray” infrastructure. Examples include building embankments, dams, levees, and channels to control flooding. The concept of “nature-based solutions,” “ecosystem-based adaptation,” “eco-DRR” or “green infrastructure” has emerged as a good alternative or complement to traditional approaches. Nature-based solutions basically cover the full scope of using ecosystems to address hazards, making use of natural processes and ecosystem services for functional purposes, such as decreasing flood risk, erosion, and landslide risk. Nature-based solutions can be completely “green” (i.e. consisting of only ecosystem elements), or “hybrid” (i.e. a combination of ecosystem elements and hard engineering approaches).</p>
                <p className="intro-text">For example, restoring mangrove cover along coastlines can reduce the impact of waves and storm surge on the shoreline and decrease erosion by slowing down water flow in its dense vegetation. Similarly, rehabilitated coral reefs can act as a barrier breaking waves further away from the coast – not unlike conventional concrete breakwaters, but with marvelous biodiversity to behold.</p>
                <p className="intro-text">These “green” nature-based solutions can also synergize with gray infrastructure. The resulting hybrid solution, for example, a removable seawall and a growing mangrove forest, can draw on the strengths of both green and gray elements to become more effective. In cities, too, nature-based solutions can alleviate flooding from heavy rains and create better microclimates. Green spaces like urban wetlands or green roofs – typical “hybrid” solutions – can store water and release it slowly back into rivers and drainage systems, but also give the water more time to sink into the ground, reducing what needs to be drained.</p>
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
                <p className="text -secondary">Contribute your nature-based project and experiences to Natural Hazards – Nature-based Solutions database, and join a growing community of practitioners, scientists and donors who are using nature-based approaches to reduce disaster risk.</p>
                <Link to="/submit" className="c-btn -primary">Submit a project</Link>
              </div>
            </Row>
          </div>
        </section>

        {/* Contact */}
        <section className="home-section contact">
          <div className="l-app-wrapper">
            <Spinner isLoading={this.props.loading} />
            <Row className="intro">
              <div className="column small-12 medium-6 medium-offset-3">
                <h1 className="h1 -line -center">Contact us</h1>
                <p className="intro-text">We welcome your feedback and value your input as we work to continually improve and update Natural Hazards – Nature-based Solutions database. Please do not hesitate to send us your comments and questions here.</p>
              </div>
            </Row>
            {(this.state.error || success || error) &&
              <Row className="intro">
                <div className="c-form column small-12 medium-8 medium-offset-2">
                  <Message message={message.message} type={message.type} />
                </div>
              </Row>
            }
            <Row>
              <div className="c-form column small-12 medium-8 medium-offset-2">
                <Form>
                  <div className="form">
                    <div className="form-field">
                      <div className="filter-field">
                        <h2 className="label">Name*</h2>
                        <Input
                          type="text"
                          name="name"
                          value=""
                          onChange={this.onInputChange}
                          validations={[]}
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <div className="filter-field">
                        <h2 className="label">E-mail*</h2>
                        <Input
                          type="text"
                          name="email"
                          value=""
                          onChange={this.onInputChange}
                          validations={['email']}
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <div className="filter-field">
                        <h2 className="label">Message*</h2>
                        <Input
                          type="text"
                          name="message"
                          value=""
                          onChange={this.onInputChange}
                          validations={[]}
                        />

                        {/* Hidden */}
                        <Input
                          type="text"
                          name="subject"
                          value=""
                          className="-hidden"
                          onChange={this.onInputChange}
                          validations={[]}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="actions">
                    <button
                      className="c-btn -filled -primary action"
                      onClick={this.onContact}
                    >
                      Send
                    </button>
                  </div>
                </Form>
              </div>
            </Row>
          </div>
        </section>
      </div>
    );
  }
}

AboutPage.propTypes = {
  success: React.PropTypes.bool,
  error: React.PropTypes.object,
  loading: React.PropTypes.bool,
  // Fucntions
  contact: React.PropTypes.func
};
AboutPage.defaultProps = {};
