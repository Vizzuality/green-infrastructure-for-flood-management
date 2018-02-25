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

    this.state = {
      error: null
    };

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
    } else if (!validator.isEmail(this.form.email)) {
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

        <div className="c-submit">
          <section className="submit-section">
            <div className="l-app-wrapper">
              <Row>
                <div className="column small-12 medium-8 medium-offset-2">
                  <h1 className="h1 -line">Privacy and policy</h1>
                  <p className="text">Your privacy on the Internet is of the utmost importance to us. Because we gather certain types of information about the users of the Natural Hazards – Nature-based Solutions site (http://www.naturebasedsolutions.org) and services, we want to ensure that you fully understand the terms and conditions surrounding the capture and use of that information. This privacy statement discloses what information we gather and how we use it. This privacy policy applies to all Natural Hazards – Nature-based Solutions sites - that is, all sites within the "naturebasedsolutions.org" domain name.</p>

                  <h2 className="h2">What Information Does Natural Hazards – Nature-based Solutions Collect?</h2>
                  <h3 className="h3">Personal information</h3>
                  <p className="text">If you register as a contributor to the project database, you will be asked for personal information, such as your name, email address, and organization. The information provided is used for technical and customer administration of the site only and isn't shared with third parties.</p>
                  <h3 className="h3">Non-personally identifiable information</h3>
                  <p className="text">Information collected is non-personally identifiable, and only summaries of visitor's behavior are produced. Examples of this type of information include statistics on which pages are most popular and which are least popular. The information collected cannot be traced back to a particular individual.</p>
                  <p className="text">The purpose of this data collection is so that Natural Hazards – Nature-based Solutions can better understand the preferences of its visitors and improve its site and services. This information collected is never connected with any personal information you supply to us if you register on our website.</p>
                  <h3 className="h3">Use of cookies</h3>
                  <p className="text">When you register for one of our services, Natural Hazards – Nature-based Solutions sets a cookie, a small bit of code stored on your computer's hard drive that enables you to manage your subscriptions and online profile. By setting this cookie,  Natural Hazards – Nature-based Solutions will remember you the next time you visit and won't have to bother you by asking questions you have already answered (like address information).</p>
                  <p className="text">You are always free to decline our cookies if your browser permits, although in that case you may not be able to use certain features on the site and may be required to re-enter information more frequently to use certain services on the website.</p>
                  <h3 className="h3">IP Addresses</h3>
                  <p className="text">In addition, Natural Hazards – Nature-based Solutions also records your IP address, which is the Internet address of your computer, and information such as your browser type and operating system. This information helps us learn about the geographical distribution of our website visitors and the technology they use to access our site. This information is never connected with the personal information you supply to us if you register on our website.</p>

                  <h2 className="h2">What If I Don't Want to Share My Information?</h2>
                  <p className="text">Registering on our site is optional. If you choose not to register or provide personal information, you can still use the Natural Hazards – Nature-based Solutions web site. However, you will not be able to receive email notifications and other updates, nor will you be able to submit a project for consideration. Nature of Risk Reduction views user information that it collects as a trusted asset for which we take great care in not misusing.</p>

                  <h2 className="h2">Security</h2>
                  <p className="text">Natural Hazards – Nature-based Solutions employs a range of technologies to protect the information maintained on our systems from loss, misuse, unauthorized access or disclosure, alteration, or destruction.</p>

                  <h2 className="h2">How to Contact Us</h2>
                  <p className="text">If you have any questions or concerns about Natural Hazards – Nature-based Solutions Privacy Policy, please contact us at <a href="mailto:XXXX@worldbank.org">XXXX@worldbank.org</a></p>

                  <h2 className="h2">Notification of Changes</h2>
                  <p className="text">If there are any changes to this privacy policy, we will post them on our web site at: <a href="http://www.naturebasedsolutions.org/privacy">www.naturebasedsolutions.org/privacy</a> so that you are completely aware of how the changes will affect you.</p>

                  <h2 className="h2">Access to Information</h2>
                  <p className="text">The Natural Hazards – Nature-based Solutions platform is a collaboration of several partners and is hosted by the World Bank Group, and therefore the World Bank's policy on Access to Information applies.</p>
                  <p className="text">The World Bank policy on Access to Information sets forth a groundbreaking change in how the World Bank makes information available to the public. Now the public can get more information than ever before—information about projects under preparation, projects under implementation, analytic and advisory activities, and Board proceedings.</p>
                  <p className="text">Underlying the new policy is the principle that the World Bank will disclose any information in its possession that is not on a list of exceptions. More information can be found <a href="http://web.worldbank.org/WBSITE/EXTERNAL/PROJECTANDOPERATIONS/EXTINFODISCLOSURE/0,,menuPK:64864911~pagePK:4749265~piPK:4749256~theSitePK:5033734,00.html">here</a>.</p>
                </div>
              </Row>
            </div>
          </section>
        </div>

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
