import { get } from 'utils/request';
import { setFiltersOptions } from 'utils/select';

/* Constants */
const GET_FILTERS_OPTIONS = 'GET_FILTERS_OPTIONS';

/* Initial state */
const initialState = {
  options: {}
};

/* Reducer */
function filtersOptionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FILTERS_OPTIONS:
      return Object.assign({}, state, {options: action.payload});
    default:
      return state;
  }
}

/* Action creators */
function getFiltersOptions() {
  return (dispatch) => {
    get({
      url: `${config.API_URL}/api/filters`,
      onSuccess: (data) => {
        dispatch({
          type: GET_FILTERS_OPTIONS,
          payload: setFiltersOptions(data)
        });
      }
    });
  };
}

export { filtersOptionsReducer, getFiltersOptions };
