import { get } from 'utils/request';
import { setFiltersOptions } from 'utils/select';

/* Constants */
const GET_FILTERS_OPTIONS = 'GET_FILTERS_OPTIONS';
const SET_LOADING_FILTERS_OPTIONS = 'SET_LOADING_FILTERS_OPTIONS';

/* Initial state */
const initialState = {
  options: {},
  loading: false
};

/* Reducer */
function filtersOptionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FILTERS_OPTIONS:
      return Object.assign({}, state, { options: action.payload });
    case SET_LOADING_FILTERS_OPTIONS:
      return Object.assign({}, state, { loading: action.payload });
    default:
      return state;
  }
}

/* Action creators */
function setLoading(loading) {
  return {
    type: SET_LOADING_FILTERS_OPTIONS,
    payload: loading
  };
}

function getFiltersOptions() {
  return (dispatch) => {
    dispatch(setLoading(true));
    get({
      url: `${config.API_URL}/api/filters`,
      onSuccess: (data) => {
        dispatch({
          type: GET_FILTERS_OPTIONS,
          payload: setFiltersOptions(data)
        });
        dispatch(setLoading(false));
      },
      onError: () => {
        dispatch(setLoading(false));
      }
    });
  };
}

export { filtersOptionsReducer, getFiltersOptions };
