import { connect } from 'react-redux';
import Terms from './Terms';
import { contact } from 'modules/user';

const mapStateToProps = state => ({
  success: state.user.success,
  loading: state.user.loading,
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({ contact(userData) { dispatch(contact(userData)); } });

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
