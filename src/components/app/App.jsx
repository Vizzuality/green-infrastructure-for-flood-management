import React from 'react';
import Header from 'components/header/Header';
import Modal from 'components/ui/Modal';

export default class App extends React.Component {

  render() {
    const isDownload = this.props.location.pathname.includes('/download/project/');
    const { modal, logged } = this.props;

    return (
      <div className="l-app">
        {!isDownload && <Header logged={logged} />}

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
  location: React.PropTypes.object,
  modal: React.PropTypes.object,
  logged: React.PropTypes.bool,
  // Functions
  toggleModal: React.PropTypes.func,
  setModalOptions: React.PropTypes.func
};
