import { connect } from 'react-redux';
import SubmitPage from './SubmitPage';
import { getFiltersOptions } from 'modules/filters_options';

const mapStateToProps = state => ({
  filtersOptions: state.filtersOptions.options
});

const mapDispatchToProps = dispatch => ({
  getFiltersOptions() {
    dispatch(getFiltersOptions());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPage);
