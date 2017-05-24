/* Constants */
const SET_SIDEBAR_WIDTH = 'SET_SIDEBAR_WIDTH';
const SET_FILTERS_UI = 'SET_FILTERS_UI';
const RESET_FILTERS_UI = 'RESET_FILTERS_UI';
const MOBILE_MENU_TOGGLE = 'MOBILE_MENU_TOGGLE';

/* Initial state */
const initialState = {
  mobileMenu: {
    opened: false
  },
  sidebar: {
    width: 0
  },
  filters: {
    searchFocus: false,
    closed: true
  }
};

/* Reducer */
function uiReducer(state = initialState, action) {
  switch (action.type) {
    case MOBILE_MENU_TOGGLE:
      return {
        ...state,
        mobileMenu: { opened: action.payload }
      };
    case SET_SIDEBAR_WIDTH:
      return {
        ...state,
        sidebar: { width: action.payload }
      };
    case SET_FILTERS_UI:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    case RESET_FILTERS_UI:
      return {
        ...state,
        filters: initialState.filters
      };
    default:
      return state;
  }
}

/* Action creators */
function toggleMobileMenu(opened) {
  return {
    type: MOBILE_MENU_TOGGLE,
    payload: opened
  };
}

function setSidebarWidth(width) {
  return {
    type: SET_SIDEBAR_WIDTH,
    payload: width
  };
}

function setFiltersUi(params) {
  return {
    type: SET_FILTERS_UI,
    payload: params
  };
}

function resetFiltersUi() {
  return {
    type: RESET_FILTERS_UI
  };
}

export { uiReducer, setSidebarWidth, setFiltersUi, resetFiltersUi, toggleMobileMenu };
