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
import { Form, Input } from 'components/form/Form';

import { dispatch } from 'main';
import { contact } from 'modules/user';

export default class AboutPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };

    this.form = {};

    // Bindings
    this.onContact = this.onContact.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  /* Lifecycle */
  componentWillReceiveProps(newProps) {
    if (newProps.user.error && !isEqual(this.props.user.error, newProps.user.error)) {
      const error = Object.values(newProps.user.error.error)[0][0];
      const errorMessage = error === 'invalid credentials' ? 'E-mail or password incorrect' : 'An error ocurred';
      this.setState({ error: errorMessage });
    } else if (!newProps.user.error && newProps.user.logged) {
      dispatch(replace('/submit'));
    }
  }

  onInputChange(e) {
    this.form[e.target.name] = e.target.value;
  }

  onContact(e) {
    e.preventDefault();
    if (this.form.email && validator.isEmail(this.form.email) &&
      this.form.name && this.form.name !== '' &&
      this.form.subject && this.form.subject !== '') {
      // Contact
      // dispatch(contact(this.form));
    } else {
      this.setState({ error: 'Fill in the form correctly' });
    }
  }

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

        {/* Contact */}
        <section className="home-section contact">
          <div className="l-app-wrapper">
            <Row className="intro">
              <div className="column small-12 medium-6 medium-offset-3">
                <h1 className="h1 -line -center">Contact us</h1>
                <p className="intro-text">We welcome your feedback and value your input as we work to continually improve and update The Nature of Risk Reduction database. Please do not hesitate to send us your comments and questions here.</p>
              </div>
            </Row>
            <Row>
              <div className="c-form column small-12 medium-8 medium-offset-2">
                <Form>
                  <div className="form">
                    <div className="filter-error">
                      <p className="error">{this.state.error}</p>
                    </div>

                    <div className="form-field">
                      <div className="filter-field">
                        <h2 className="title">Name*</h2>
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
                        <h2 className="title">E-mail*</h2>
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
                        <h2 className="title">Subject*</h2>
                        <Input
                          type="text"
                          name="subject"
                          value=""
                          onChange={this.onInputChange}
                          validations={[]}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="actions">
                    <button
                      className="c-btn -filled -primary action -disabled"
                      onClick={this.onContact}
                      disabled
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

AboutPage.propTypes = {};
AboutPage.defaultProps = {};
