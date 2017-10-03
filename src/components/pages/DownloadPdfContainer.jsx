import { connect } from 'react-redux';
import DownloadPdf from './DownloadPdf';
// import { getProjects, setProjectsDetail, setProjectsFilters, resetProjectFilters } from 'modules/projects';
import { getProjects, setProjectsDetail } from 'modules/projects';
import getProjectDetails from 'selectors/project_detail';

const mapStateToProps = state => ({
  projects: state.projects.list,
  mapState: state.map,
  projectDetail: getProjectDetails(state)
});

const mapDispatchToProps = dispatch => ({
  setProjectsDetail(id) {
    dispatch(setProjectsDetail(id));
  },
  getProjects(query) {
    dispatch(getProjects(query));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadPdf);
