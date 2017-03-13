import { connect } from 'react-redux';
import Filters from './Filters';
import { setProjectFilters } from 'modules/projects';

const mapStateToProps = ({ projects }) => ({
  filters: projects.filters,
  search: projects.search
});

const mapDispatchToProps = dispatch => ({
  setProjectFilters: (filters) => {
    dispatch(setProjectFilters(filters));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
