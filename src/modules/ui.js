/* Constants */
const SET_SIDEBAR_WIDTH = 'SET_SIDEBAR_WIDTH';
const SET_FILTERS_UI = 'SET_FILTERS_UI';

/* Initial state */
const initialState = {
  sidebar: {
    width: 0
  },
  filters: {
    searchFocus: false,
    opened: false
  }
};

/* Reducer */
function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_WIDTH:
      return {
        sidebar: { width: action.payload }
      };
    case SET_FILTERS_UI:
      return {
        filters: {
          ...state.filters.ui,
          ...action.payload
        }
      };
    default:
      return state;
  }
}

/* Action creators */
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

export { uiReducer, setSidebarWidth, setFiltersUi };
