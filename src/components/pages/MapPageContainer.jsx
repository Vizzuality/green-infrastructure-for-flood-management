import { connect } from 'react-redux';
import MapPage from './MapPage';
import { getProjects, setProjectsSearch, setProjectsDetail } from 'modules/projects';
import getActiveProjects from 'selectors/projects_active';
import getProjectDetails from 'selectors/project_detail';
import { updateUrl } from 'modules/url';
import { setMapLocation } from 'modules/map';
import { setSidebarWidth } from 'modules/ui'

const mapStateToProps = state => ({
  mapState: state.map,
  projects: getActiveProjects(state),
  loading: state.projects.loading,
  projectDetail: getProjectDetails(state),
  searchQuery: state.projects.search,
  sidebarWidth: state.ui.sidebar.width
});

const mapDispatchToProps = dispatch => ({
  setSidebarWidth(width) {
    dispatch(setSidebarWidth(width));
  },
  setProjectsDetail(projectId) {
    dispatch(setProjectsDetail(projectId));
    dispatch(updateUrl());
  },
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
  setProjectsSearch(query) {
    dispatch(setProjectsSearch(query));
    dispatch(updateUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
