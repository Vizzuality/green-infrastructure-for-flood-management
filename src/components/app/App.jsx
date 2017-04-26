import React from 'react';
import Header from 'components/header/Header';

export default class App extends React.Component {

  render() {
    const isDownload = this.props.location.pathname.includes('/download/project/');

    return (
      <div className="l-app">
        {!isDownload && <Header />}
        <main role="main" className="l-main">
          {this.props.main}
        </main>
        {this.props.footer}
      </div>
    );
  }
}

App.propTypes = {
  main: React.PropTypes.element,
  footer: React.PropTypes.element,
  location: React.PropTypes.object
};
