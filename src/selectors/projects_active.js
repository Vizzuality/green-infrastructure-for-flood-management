import { createSelector } from 'reselect';

const projects = state => state.projects;

// TODO: implement logic
function getActiveProjects(_projects) {
  return _projects.list;
}

// Export the selector
export default createSelector(
  projects,
  getActiveProjects
);
