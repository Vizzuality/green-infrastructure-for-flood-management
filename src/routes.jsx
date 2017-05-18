import React from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Router, Route } from 'react-router';
import Footer from 'components/footer/Footer';
import { onEnterMapPage, onEnterProjectDetail } from 'modules/url';

// App
import App from 'components/app/AppContainer';
// Pages
import HomePage from 'components/pages/HomePage';
import SubmitPage from 'components/pages/SubmitPageContainer';
import MapPageContainer from 'components/pages/MapPageContainer';
import LoginPage from 'components/pages/LoginPageContainer';
import AboutPage from 'components/pages/AboutPage';

const Routes = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute components={{ main: HomePage, footer: Footer }} />
      <Route path="map">
        <IndexRoute components={{ main: MapPageContainer }} onEnter={onEnterMapPage} />
        <Route path="project/:id" components={{ main: MapPageContainer }} onEnter={onEnterProjectDetail} />
      </Route>
      <Route path="submit">
        <IndexRoute components={{ main: SubmitPage, footer: Footer }} />
      </Route>
      <Route path="about">
        <IndexRoute components={{ main: AboutPage, footer: Footer }} />
      </Route>
      <Route path="signin">
        <IndexRoute components={{ main: LoginPage, footer: Footer }} />
      </Route>
    </Route>
  </Router>
);

Routes.propTypes = {
  history: React.PropTypes.object
};

export default connect()(Routes);
