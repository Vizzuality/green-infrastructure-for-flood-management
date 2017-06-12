// NOTE: APi doc -> https://sc-api-documentation.herokuapp.com/index.html#registration

import { isLogged } from 'utils/auth';
import { postWithHeaders, getWithHeaders } from 'utils/request';
import { replace } from 'react-router-redux';

/* Constants */
const SET_LOGGED = 'SET_LOGGED';
const SET_USER_DATA = 'SET_USER_DATA';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';
const SET_CONTACT_SUCCSESS = 'SET_CONTACT_SUCCSESS';

/* Initial state */
const initialState = {
  data: null,
  logged: isLogged(),
  loading: false,
  error: null,
  succses: false
};

/* Reducer */
function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGGED:
      return {
        ...state,
        logged: action.payload
      };
    case SET_USER_DATA:
      return {
        ...state,
        data: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_CONTACT_SUCCSESS:
      return {
        ...state,
        success: action.payload
      };
    default:
      return state;
  }
}

/* Action creators */
function setLogged(logged) {
  return {
    type: SET_LOGGED,
    payload: logged
  };
}

function setUserData(data) {
  return {
    type: SET_USER_DATA,
    payload: data
  };
}

function setLoading(loading) {
  return {
    type: SET_LOADING,
    payload: loading
  };
}

function setError(error) {
  return {
    type: SET_ERROR,
    payload: error
  };
}

function setContactSuccsess(success) {
  return {
    type: SET_CONTACT_SUCCSESS,
    payload: success
  };
}

/* Redux-thunk async actions */
function getUserData() {
  return (dispatch) => {
    getWithHeaders({
      url: `${config.API_URL}/users/current-user`,
      onSuccess({ data }) {
        dispatch(setUserData(data.attributes));
      }
    });
  };
}

function login(userData) {
  return (dispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    postWithHeaders({
      url: `${config.API_URL}/api/auth/`,
      body: userData,
      onSuccess({ auth_token }) {
        localStorage.setItem('token', auth_token);
        dispatch(setLogged(true));
        dispatch(setLoading(false));
        // dispatch(replace('/submit'));
        // dispatch(getUserData());
      },
      onError(error) {
        dispatch(setLoading(false));
        dispatch(setError(error));
      }
    });
  };
}

function logout() {
  return (dispatch) => {
    delete localStorage.token;
    dispatch(setLogged(false));
    dispatch(setUserData(null));
    dispatch(replace('/'));
  };
}

function register({ email, nickname, password, password_confirmation, name }, loginAfterRegister) {
  return (dispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    postWithHeaders({
      url: `${config.API_URL}/register`,
      body: {
        user: {
          email,
          nickname,
          password,
          password_confirmation,
          name
        }
      },
      onSuccess() {
        // Login user after register
        dispatch(setLoading(false));
        loginAfterRegister && dispatch(login({ email, password }));
      },
      onError(error) {
        dispatch(setLoading(false));
        dispatch(setError(error));
      }
    });
  };
}

function contact(userData) {
  return (dispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    postWithHeaders({
      url: `${config.API_URL}/api/contact/`,
      headers: {
        Accept: 'application/json'
      },
      body: userData,
      onSuccess() {
        dispatch(setContactSuccsess(true));
        dispatch(setLoading(false));
        dispatch(setError(null));
      },
      onError(error) {
        if (error.status_code === '202') {
          dispatch(setContactSuccsess(true));
          dispatch(setLoading(false));
          dispatch(setError(null));
        } else {
          dispatch(setContactSuccsess(false));
          dispatch(setLoading(false));
          dispatch(setError(error));
        }
      }
    });
  };
}

export { userReducer, login, logout, getUserData, register, contact };
