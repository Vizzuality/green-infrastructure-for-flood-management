import { connect } from 'react-redux';
import MapPage from './MapPage';
import { getProjects } from 'modules/projects';

const mapStateToProps = ({ projects }) => ({
  projects: projects.list
});

const mapDispatchToProps = dispatch => ({
  getProjects: () => {
    dispatch(getProjects());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
