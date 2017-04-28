import { connect } from 'react-redux';
import MapPage from './MapPage';
import { getProjects, setProjectsDetail, setProjectsFilters, resetProjectFilters } from 'modules/projects';
import getProjectDetails from 'selectors/project_detail';
import { updateUrl } from 'modules/url';
import { setMapLocation, resetMapState } from 'modules/map';
import { setSidebarWidth, setFiltersUi, resetFiltersUi } from 'modules/ui';
import { getFiltersOptions } from 'modules/filters_options';

const mapStateToProps = state => ({
  filters: state.projects.filters,
  mapState: state.map,
  projects: state.projects.list,
  loading: state.projects.loading,
  relatedProjects: state.projects.relatedProjects,
  relatedLoading: state.projects.relatedLoading,
  projectDetail: getProjectDetails(state),
  sidebarWidth: state.ui.sidebar.width,
  filtersUi: state.ui.filters,
  filtersOptions: state.filtersOptions.options
});

const mapDispatchToProps = dispatch => ({
  setFiltersUi(params) {
    dispatch(setFiltersUi(params));
  },
  setSidebarWidth(width) {
    dispatch(setSidebarWidth(width));
  },
  resetMapState() {
    dispatch(resetMapState());
    dispatch(resetProjectFilters());
    dispatch(resetFiltersUi());
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
  getFiltersOptions() {
    dispatch(getFiltersOptions());
  },
  setProjectsFilters: (filters) => {
    dispatch(setProjectsFilters(filters));
    dispatch(updateUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
