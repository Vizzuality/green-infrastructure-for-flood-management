import { connect } from 'react-redux';
import App from './App';
import { toggleModal, setModalOptions } from 'modules/modal';

const mapStateToProps = ({ modal, user }) => ({
  modal,
  logged: user.logged
});

const mapDispatchToProps = dispatch => ({
  toggleModal: () => { dispatch(toggleModal()); },
  setModalOptions: () => { dispatch(setModalOptions()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
