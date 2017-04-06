import { connect } from 'react-redux';
import Filters from './Filters';
import { setProjectsFilters } from 'modules/projects';
import { updateUrl } from 'modules/url';

const mapStateToProps = ({ projects }) => ({
  filters: projects.filters,
  search: projects.search
});

const mapDispatchToProps = dispatch => ({
  setProjectsFilters: (filters) => {
    dispatch(setProjectsFilters(filters));
    dispatch(updateUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
