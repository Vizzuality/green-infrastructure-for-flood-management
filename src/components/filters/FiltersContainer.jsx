import { connect } from 'react-redux';
import Filters from './Filters';
import { setProjectsFilters } from 'modules/projects';
import { getFiltersOptions } from 'modules/filters_options';
import { updateUrl } from 'modules/url';

const mapStateToProps = ({ projects, filtersOptions }) => ({
  filters: projects.filters,
  search: projects.search,
  options: filtersOptions.options
});

const mapDispatchToProps = dispatch => ({
  setProjectsFilters: (filters) => {
    dispatch(setProjectsFilters(filters));
    dispatch(updateUrl());
  },
   getFiltersOptions() {
    dispatch(getFiltersOptions());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
