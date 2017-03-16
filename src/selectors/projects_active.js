import { createSelector } from 'reselect';

const projects = state => state.projects;

// TODO: implement logic
function getActiveProjects(_projects) {
  const { search } = _projects;
  return _projects.list.filter(i => i.title.match(search));
}

// Export the selector
export default createSelector(
  projects,
  getActiveProjects
);
