/* Constants */
const SET_SIDEBAR_WIDTH = 'SET_SIDEBAR_WIDTH';

/* Initial state */
const initialState = {
  sidebar: {
    width: 0
  }
};

/* Reducer */
function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_WIDTH:
      return {
        sidebar: { width: action.payload }
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

export { uiReducer, setSidebarWidth };
