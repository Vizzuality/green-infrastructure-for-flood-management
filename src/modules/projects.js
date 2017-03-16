import { mockProjects } from 'mocks/projects';

/* Constants */
const SET_PROJECTS = 'SET_PROJECTS';
const SET_PROJECT_SEARCH = 'SET_PROJECT_SEARCH';
const SET_PROJECT_FILTERS = 'SET_PROJECT_FILTERS';
const SET_PROJECT_DETAIL = 'SET_PROJECT_DETAIL';

/* Initial state */
const initialState = {
  list: [],
  search: '',
  detail: null,
  filters: {
    type: 'all',
    status: 'all',
    intervention: ['green', 'grey'],
    hazard: ['urban', 'river'],
    solution: ['solution_a', 'solution_b']
  }
};

/* Reducer */
function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        list: action.payload
      };
    case SET_PROJECT_SEARCH:
      return {
        ...state,
        search: action.payload
      };
    case SET_PROJECT_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    case SET_PROJECT_DETAIL:
      return {
        ...state,
        detail: action.payload
      };
    default:
      return state;
  }
}

/* Action creators */
function setProjectDetail(projectId) {
  return {
    type: SET_PROJECT_DETAIL,
    payload: projectId
  };
}

function setProjectFilters(filters) {
  return {
    type: SET_PROJECT_FILTERS,
    payload: filters
  };
}

function setProjectSearch(query) {
  return {
    type: SET_PROJECT_SEARCH,
    payload: query
  };
}

function setProjects(projects) {
  return {
    type: SET_PROJECTS,
    payload: projects
  };
}

function getProjects() {
  /* TODO: unmock */
  return (dispatch) => {
    setTimeout(() => {
      dispatch(setProjects(mockProjects));
    }, 500);
  };
}

export { projectsReducer, setProjectFilters, setProjectSearch, setProjects, getProjects, setProjectDetail };
