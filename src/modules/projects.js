import { get } from 'utils/request';

/* Constants */
const SET_PROJECTS = 'SET_PROJECTS';
const SET_PROJECTS_LOADING = 'SET_PROJECTS_LOADING';
const SET_PROJECTS_SEARCH = 'SET_PROJECTS_SEARCH';
const SET_PROJECTS_FILTERS = 'SET_PROJECTS_FILTERS';
const SET_PROJECTS_DETAIL = 'SET_PROJECTS_DETAIL';

/* Initial state */
const initialState = {
  list: [],
  loading: false,
  detail: null,
  filters: {
    search: '',
    countries: [],
    regions: [],
    organizations: [],
    scales: [],
    intervention_types: [],
    hazard_types: [],
    nature_based_solutions: []
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
    case SET_PROJECTS_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_PROJECTS_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    case SET_PROJECTS_DETAIL:
      return {
        ...state,
        detail: action.payload
      };
    default:
      return state;
  }
}

/* Action creators */
function setProjectsLoading(loading) {
  return {
    type: SET_PROJECTS_LOADING,
    payload: loading
  };
}

function setProjectsDetail(projectId) {
  return {
    type: SET_PROJECTS_DETAIL,
    payload: projectId
  };
}

function setProjectsFilters(filters) {
  return {
    type: SET_PROJECTS_FILTERS,
    payload: filters
  };
}

function setProjects(projects) {
  return {
    type: SET_PROJECTS,
    payload: projects
  };
}

function getProjects(query) {
  const _query = query ? `?${query}` : '';

  return (dispatch) => {
    dispatch(setProjectsLoading(true));
    get({
      url: `${config.API_URL}/api/projects${_query}`,
      onSuccess: (data) => {
        dispatch(setProjects(data));
        dispatch(setProjectsLoading(false));
      }
    });
  };
}

export { projectsReducer, setProjectsFilters, setProjects, getProjects, setProjectsDetail };
