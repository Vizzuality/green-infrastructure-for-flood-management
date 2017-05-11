/* Constants */
const SET_SUBMIT_LOADING = 'SET_SUBMIT_LOADING';
const SET_SUBMIT_SUCCESS = 'SET_SUBMIT_SUCCESS';
const SET_SUBMIT_ERROR = 'SET_SUBMIT_ERROR';

/* Initial state */
const initialState = {
  success: false,
  loading: false,
  error: {}
};

/* Reducer */
function submitReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SUBMIT_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_SUBMIT_SUCCESS:
      return {
        ...state,
        success: action.payload
      };
    case SET_SUBMIT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

/* Action creators */
function setSubmitLoading(width) {
  return {
    type: SET_SUBMIT_LOADING,
    payload: width
  };
}

function setSubmitSuccess(params) {
  return {
    type: SET_SUBMIT_SUCCESS,
    payload: params
  };
}

function setSubmitError() {
  return {
    type: SET_SUBMIT_ERROR
  };
}

export { submitReducer, setSubmitLoading, setSubmitSuccess, setSubmitError };
