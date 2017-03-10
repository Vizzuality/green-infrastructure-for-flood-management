import React from 'react';
import Header from 'components/header/Header';

export default class App extends React.Component {

  render() {
    return (
      <div className="l-app">
        <Header />
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
  footer: React.PropTypes.element
};
