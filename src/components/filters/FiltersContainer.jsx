import { connect } from 'react-redux';
import Filters from './Filters';
import { setProjectFilters } from 'modules/projects';
import { updateUrl } from 'modules/url';

const mapStateToProps = ({ projects }) => ({
  filters: projects.filters,
  search: projects.search
});

const mapDispatchToProps = dispatch => ({
  setProjectFilters: (filters) => {
    dispatch(setProjectFilters(filters));
    dispatch(updateUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
