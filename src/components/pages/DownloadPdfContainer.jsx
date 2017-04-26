import { connect } from 'react-redux';
import DownloadPdf from './DownloadPdf';
// import { getProjects, setProjectsDetail, setProjectsFilters, resetProjectFilters } from 'modules/projects';
import { getProjects, setProjectsDetail } from 'modules/projects';
import getProjectDetails from 'selectors/project_detail';

const mapStateToProps = state => ({
  projects: state.projects.list,
  data: getProjectDetails(state)
});

const mapDispatchToProps = dispatch => ({
//   setFiltersUi(params) {
//     dispatch(setFiltersUi(params));
//   },
//   setSidebarWidth(width) {
//     dispatch(setSidebarWidth(width));
//   },
//   resetMapState() {
//     dispatch(resetMapState());
//     dispatch(resetProjectFilters());
//     dispatch(resetFiltersUi());
//     dispatch(setProjectsDetail(null));
//   },
//   setMapLocation(params) {
//     dispatch(setMapLocation(params));
//     dispatch(updateUrl());
//   },
  setProjectsDetail(id) {
    dispatch(setProjectsDetail(id));
  },
  getProjects(query) {
    dispatch(getProjects(query));
  }
//   getFiltersOptions() {
//     dispatch(getFiltersOptions());
//   },
//   setProjectsFilters: (filters) => {
//     dispatch(setProjectsFilters(filters));
//     dispatch(updateUrl());
//   }
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadPdf);
