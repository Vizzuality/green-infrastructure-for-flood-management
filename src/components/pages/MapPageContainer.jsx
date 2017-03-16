import { connect } from 'react-redux';
import MapPage from './MapPage';
import { getProjects, setProjectSearch } from 'modules/projects';
import getActiveProjects from 'selectors/projects_active';
import { updateUrl } from 'modules/url';
import { setMapLocation } from 'modules/map';

const mapStateToProps = state => ({
  mapState: state.map,
  projects: getActiveProjects(state),
  searchQuery: state.projects.search
});

const mapDispatchToProps = dispatch => ({
  setMapLocation(params) {
    dispatch(setMapLocation(params));
    dispatch(updateUrl());
  },
  updateUrl() {
    dispatch(updateUrl());
  },
  getProjects() {
    dispatch(getProjects());
  },
  setProjectSearch(query) {
    dispatch(setProjectSearch(query));
    dispatch(updateUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
