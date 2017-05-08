import React from 'react';
import isEqual from 'lodash/isEqual';
import validator from 'validator';
import capitalize from 'lodash/capitalize';
import { SvgIcon } from 'vizz-components';
import { validation } from 'utils/validation';
import { replace } from 'react-router-redux';
import Validation from 'react-validation';

import { Row } from 'components/ui/Grid';
import Spinner from 'components/ui/Spinner';
import { Input } from 'components/form/From';

import { dispatch } from 'main';
import { login } from 'modules/user';


export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
    this.form = {};

    // Bindings
    this.onLogin = this.onLogin.bind(this);
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

  onLogin(e) {
    e.preventDefault();
    if (this.form.email && validator.isEmail(this.form.email) &&
      this.form.password && this.form.password !== '') {
      // Login user
      dispatch(login(this.form));
      // dispatch(replace('/submit'));
    } else {
      this.setState({ error: 'Fill in the form correctly' });
    }
  }

  render() {
    return (
      <div className="c-login">
        <section className="home-section">
          <div className="l-app-wrapper">
            <Row>
              <div className="column small-12 medium-8 medium-offset-2">
                <h1 className="h1 -line">Sign in</h1>
                <p className="text">Enter your details below.</p>

                <div className="c-form">
                  <Validation.components.Form>
                    <div className="form">
                      <div className="filter-error">
                        <p className="error">{this.state.error}</p>
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
                          <h2 className="title">Password*</h2>
                          <Input
                            type="password"
                            name="password"
                            value=""
                            onChange={this.onInputChange}
                            validations={[]}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="actions">
                      <button className="c-btn -filled -primary action" onClick={this.onLogin}>
                        Sing in
                      </button>
                    </div>
                  </Validation.components.Form>
                  <Spinner isLoading={this.props.user.loading} />
                </div>
              </div>
            </Row>
          </div>
        </section>
      </div>
    );
  }
}

LoginPage.propTypes = {
  user: React.PropTypes.object
};
LoginPage.defaultProps = {};
