import { connect } from 'react-redux';
import MapPage from './MapPage';
import { getProjects, setProjectsDetail, setProjectsFilters } from 'modules/projects';
import getProjectDetails from 'selectors/project_detail';
import { updateUrl } from 'modules/url';
import { setMapLocation, resetMapState } from 'modules/map';
import { setSidebarWidth, setFiltersUi } from 'modules/ui';

const mapStateToProps = state => ({
  filters: state.projects.filters,
  mapState: state.map,
  projects: state.projects.list,
  loading: state.projects.loading,
  projectDetail: getProjectDetails(state),
  sidebarWidth: state.ui.sidebar.width,
  filtersUi: state.ui.filters
});

const mapDispatchToProps = dispatch => ({
  setFiltersUi(params) {
    dispatch(setFiltersUi(params));
  },
  setSidebarWidth(width) {
    dispatch(setSidebarWidth(width));
  },
  setProjectsDetail(projectId) {
    dispatch(setProjectsDetail(projectId));
    dispatch(updateUrl());
  },
  resetMapState() {
    dispatch(resetMapState());
    dispatch(setProjectsDetail(null));
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
