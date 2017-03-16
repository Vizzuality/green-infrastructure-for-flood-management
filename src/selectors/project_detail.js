import { createSelector } from 'reselect';

const projects = state => state.projects;

// TODO: implement logic
function getProjectDetails(_projects) {
  return _projects.list.find(p => p.id === _projects.detail);
}

// Export the selector
export default createSelector(
  projects,
  getProjectDetails
);
