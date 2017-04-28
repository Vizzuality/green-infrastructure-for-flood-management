import { get } from 'utils/request';

/* Constants */
const SET_PROJECTS = 'SET_PROJECTS';
const SET_PROJECTS_LOADING = 'SET_PROJECTS_LOADING';
const SET_PROJECTS_SEARCH = 'SET_PROJECTS_SEARCH';
const SET_PROJECTS_FILTERS = 'SET_PROJECTS_FILTERS';
const SET_PROJECTS_DETAIL = 'SET_PROJECTS_DETAIL';
const SET_RELATED_PROJECTS = 'SET_RELATED_PROJECTS';
const SET_RELATED_LOADING = 'SET_RELATED_LOADING';
const RESET_PROJECT_FILTERS = 'RESET_PROJECT_FILTERS';

/* Initial state */
const initialState = {
  list: [],
  loading: false,
  relatedProjects: [],
  relatedLoading: false,
  detail: null,
  filters: {
    name: '',
    countries: [],
    regions: [],
    organizations: [],
    scales: [],
    intervention_types: [],
    hazard_types: [],
    nature_based_solutions: [],
    co_benefits: [],
    primary_benefits: [],
    status: [],
    from_cost: null,
    to_cost: null,
    order: 'name',
    direction: 'asc'
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
    case RESET_PROJECT_FILTERS:
      return {
        ...state,
        filters: initialState.filters
      };
    case SET_PROJECTS_DETAIL:
      return {
        ...state,
        detail: action.payload
      };
    case SET_RELATED_PROJECTS:
      return {
        ...state,
        relatedProjects: action.payload
      };
    case SET_RELATED_LOADING:
      return {
        ...state,
        relatedLoading: action.payload
      };
    default:
      return state;
  }
}

/* Action creators */
function resetProjectFilters() {
  return {
    type: RESET_PROJECT_FILTERS
  };
}

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

function setRelatedProjects(related) {
  return {
    type: SET_RELATED_PROJECTS,
    payload: related
  };
}

function setRelatedLoading(loading) {
  return {
    type: SET_RELATED_LOADING,
    payload: loading
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

function getRelatedProjects(id) {
  return (dispatch) => {
    dispatch(setRelatedLoading(true));
    get({
      url: `${config.API_URL}/api/projects/${id}/related`,
      onSuccess: (data) => {
        dispatch(setRelatedProjects(data));
        dispatch(setRelatedLoading(false));
      },
      onError: (er) => {
        console.error(er);
      }
    });
  };
}

export { projectsReducer, setProjectsFilters, setProjects, getProjects, setProjectsDetail, resetProjectFilters, getRelatedProjects };
