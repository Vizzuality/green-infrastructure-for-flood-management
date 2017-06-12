import { connect } from 'react-redux';
import SubmitPage from './SubmitPage';
import { getFiltersOptions } from 'modules/filters_options';
import { submit } from 'modules/submit';

const mapStateToProps = state => ({
  filtersOptions: state.filtersOptions.options,
  loadingFilters: state.filtersOptions.loading,
  success: state.submit.success,
  loading: state.submit.loading,
  error: state.submit.error
});

const mapDispatchToProps = dispatch => ({
  getFiltersOptions() { dispatch(getFiltersOptions()); },
  submit(projectData) { dispatch(submit(projectData)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPage);
