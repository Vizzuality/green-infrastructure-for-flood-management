import { postWithHeaders, getWithHeaders } from 'utils/request';

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

function setSubmitSuccess(submitted) {
  return {
    type: SET_SUBMIT_SUCCESS,
    payload: submitted
  };
}

function setSubmitError() {
  return {
    type: SET_SUBMIT_ERROR
  };
}

function submit(projectData) {
  return (dispatch) => {
    dispatch(setSubmitError(null));
    dispatch(setSubmitLoading(true));
    postWithHeaders({
      url: `${config.API_URL}/api/submit/`,
      body: projectData,
      onSuccess(data) {
        dispatch(setSubmitSuccess(true));
        dispatch(setSubmitLoading(false));
      },
      onError(error) {
        dispatch(setSubmitLoading(false));
        dispatch(setSubmitError(error));
      }
    });
  };
}

export { submitReducer, submit };
