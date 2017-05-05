import React from 'react';
import { toastr } from 'react-redux-toastr';
import isEqual from 'lodash/isEqual';
import capitalize from 'lodash/capitalize';
import { SvgIcon } from 'vizz-components';
import { validation } from 'utils/validation';
import Validation from 'react-validation';

import { Row } from 'components/ui/Grid';
import Spinner from 'components/ui/Spinner';

import { dispatch } from 'main';
import { login } from 'modules/user';


export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.form = {};

    // Bindings
    this.onLogin = this.onLogin.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  /* Lifecycle */
  componentWillReceiveProps(newProps) {
    if (newProps.user.error && !isEqual(this.props.user.error, newProps.user.error)) {
      toastr.error(capitalize(Object.values(newProps.user.error.error)[0][0]));
    }
  }

  onInputChange(e) {
    this.form[e.target.name] = e.target.value;
  }

  onLogin(e) {
    e.preventDefault();
    // Login user
    dispatch(login(this.form));
  }

  render() {
    return (
      <div className="c-login">
        <section className="home-section">
          <div className="l-app-wrapper">
            <Row>
              <div className="column small-12">
                <h1 className="h1 -line">Sign in</h1>
                <p className="text">Enter your details below.</p>

                <div className="c-form">
                  <div className="form">
                    <div className="form-field">
                      <div className="filter-field">
                        <h2 className="title">E-mail</h2>
                        <input type="email" name="email" onChange={this.onInputChange} required />
                      </div>
                    </div>

                    <div className="form-field">
                      <div className="filter-field">
                        <h2 className="title">Password</h2>
                        <input type="password" name="password" onChange={this.onInputChange} required />
                      </div>
                    </div>
                  </div>

                  <div className="actions">
                    <button className="c-btn -filled -primary action" onClick={this.onLogin}>
                      Sing in
                    </button>
                  </div>
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
