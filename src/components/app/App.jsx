import React from 'react';
import Header from 'components/header/Header';
import Modal from 'components/ui/Modal';

export default class App extends React.Component {

  render() {
    const { modal } = this.props;

    return (
      <div className="l-app">
        <Header />
        <main role="main" className="l-main">
          {this.props.main}
        </main>
        {this.props.footer}
        <Modal
          open={modal.open}
          options={modal.options}
          loading={modal.loading}
          toggleModal={this.props.toggleModal}
          setModalOptions={this.props.setModalOptions}
        />
      </div>
    );
  }
}

App.propTypes = {
  main: React.PropTypes.element,
  footer: React.PropTypes.element,
  modal: React.PropTypes.object,
  // Functions
  toggleModal: React.PropTypes.func,
  setModalOptions: React.PropTypes.func
};
