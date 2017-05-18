import { connect } from 'react-redux';
import LoginPage from './LoginPage';

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps, null)(LoginPage);
