import { connect } from 'react-redux';
import MapPage from './MapPage';
import { getProjects, setProjectsDetail, setProjectsFilters } from 'modules/projects';
import getProjectDetails from 'selectors/project_detail';
import { updateUrl } from 'modules/url';
import { setMapLocation } from 'modules/map';
import { setSidebarWidth } from 'modules/ui'

const mapStateToProps = state => ({
  filters: state.projects.filters,
  mapState: state.map,
  projects: state.projects.list,
  loading: state.projects.loading,
  projectDetail: getProjectDetails(state),
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
  getProjects(query) {
    dispatch(getProjects(query));
  },
  setProjectsFilters: (filters) => {
    dispatch(setProjectsFilters(filters));
    dispatch(updateUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
