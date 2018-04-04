import { connect } from 'react-redux';
import AboutPage from './AboutPage';
import { contact } from 'modules/user';

const mapStateToProps = state => ({
  success: state.user.success,
  loading: state.user.loading,
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({ contact(projectData) { dispatch(contact(projectData)); } });

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
