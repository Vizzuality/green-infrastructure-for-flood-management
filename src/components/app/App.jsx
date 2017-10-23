import React from 'react';
import Header from 'components/header/Header';
import Modal from 'components/ui/Modal';
import OffCanvas from 'components/ui/OffCanvas';
import OnlyOn from 'components/ui/Responsive';
import classnames from 'classnames';
import links from 'constants/links';
import Nav from 'components/ui/Nav';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.toggleMobileMenu(false);
  }

  render() {
    const classNames = classnames(
      'l-main',
      { '-map': window.location.pathname.includes('/map') }
    );
    const isDownload = this.props.location.pathname.includes('/download/project/');
    const { modal, logged } = this.props;

    return (
      <div>
        <div className="l-app">
          {!isDownload && <Header path={this.props.location.pathname} logged={logged} />}
          <main role="main" className={classNames}>
            <div className="main-content">
              {this.props.main}
            </div>
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
        <OnlyOn device="mobile">
          <OffCanvas opened={this.props.mobileMenu.opened} className="-mobile-menu" onClick={this.onClick}>
            <div className="mobile-menu">
              <Nav className="-stacked" links={links} logged={logged} onClick={this.onClick} />
            </div>
          </OffCanvas>
        </OnlyOn>
      </div>
    );
  }
}

App.propTypes = {
  main: React.PropTypes.element,
  footer: React.PropTypes.element,
  location: React.PropTypes.object,
  mobileMenu: React.PropTypes.object,
  modal: React.PropTypes.object,
  logged: React.PropTypes.bool,
  // Functions
  toggleModal: React.PropTypes.func,
  toggleMobileMenu: React.PropTypes.func,
  setModalOptions: React.PropTypes.func
};
