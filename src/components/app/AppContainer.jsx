import { connect } from 'react-redux';
import App from './App';
import { toggleModal, setModalOptions } from 'modules/modal';
import { toggleMobileMenu } from 'modules/ui';

const mapStateToProps = ({ modal, user, ui }) => ({
  modal,
  logged: user.logged,
  mobileMenu: ui.mobileMenu
});

const mapDispatchToProps = dispatch => ({
  toggleModal: () => { dispatch(toggleModal()); },
  toggleMobileMenu: () => { dispatch(toggleMobileMenu()); },
  setModalOptions: () => { dispatch(setModalOptions()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
