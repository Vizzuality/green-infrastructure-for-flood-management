import React from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Router, Route, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll/lib/useScroll'; // https://github.com/taion/react-router-scroll#minimizing-bundle-size
import Footer from 'components/footer/Footer';
import { onEnterMapPage, onEnterProjectDetail, shouldUpdateScroll } from 'modules/url';

// App
import App from 'components/app/AppContainer';
// Pages
import HomePage from 'components/pages/HomePage';
import SubmitPage from 'components/pages/SubmitPageContainer';
import MapPageContainer from 'components/pages/MapPageContainer';
import DownloadPdfContainer from 'components/pages/DownloadPdfContainer';
import LoginPage from 'components/pages/LoginPageContainer';
import GuidancePage from 'components/pages/GuidancePage';
import AboutPageContainer from 'components/pages/AboutPageContainer';
import PrivacyPolicyContainer from 'components/pages/PrivacyPolicyContainer';
import TermsContainer from 'components/pages/TermsContainer';

const Routes = ({ history }) => (
  <Router
    history={history}
    render={applyRouterMiddleware(useScroll(shouldUpdateScroll))}
  >
    <Route path="/" component={App}>
      <IndexRoute components={{ main: HomePage, footer: Footer }} />
      <Route path="map">
        <IndexRoute components={{ main: MapPageContainer }} onEnter={onEnterMapPage} />
        <Route path="project/:id" components={{ main: MapPageContainer }} onEnter={onEnterProjectDetail} />
      </Route>
      <Route path="guidance">
        <IndexRoute components={{ main: GuidancePage, footer: Footer }} />
      </Route>
      <Route path="submit">
        <IndexRoute components={{ main: SubmitPage, footer: Footer }} />
      </Route>
      <Route path="download/project/:id">
        <IndexRoute components={{ main: DownloadPdfContainer }} onEnter={onEnterProjectDetail} />
      </Route>
      <Route path="about">
        <IndexRoute components={{ main: AboutPageContainer, footer: Footer }} />
      </Route>
      <Route path="privacy-policy">
        <IndexRoute components={{ main: PrivacyPolicyContainer, footer: Footer }} />
      </Route>
      <Route path="terms-and-conditions">
        <IndexRoute components={{ main: TermsContainer, footer: Footer }} />
      </Route>
    </Route>
  </Router>
);

Routes.propTypes = {
  history: React.PropTypes.object
};

export default connect()(Routes);
