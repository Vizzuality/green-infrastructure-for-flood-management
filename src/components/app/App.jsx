import React from 'react';

export default class App extends React.Component {

  render() {
    return (
      <div className="l-app">
        <main role="main" className="l-main l-content">
          {this.props.children}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  getDatasets: React.PropTypes.func
};
