import { connect } from 'react-redux';
import MapPage from './MapPage';
import { getProjects, setProjectSearch } from 'modules/projects';
import getActiveProjects from 'selectors/projects_active';

const mapStateToProps = (state) => ({
  projects: getActiveProjects(state),
  searchQuery: state.projects.search
});

const mapDispatchToProps = dispatch => ({
  getProjects() {
    dispatch(getProjects());
  },
  setProjectSearch(query) {
    dispatch(setProjectSearch(query));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
