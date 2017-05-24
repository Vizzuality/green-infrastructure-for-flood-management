// CONSTANTS
const MODAL_TOGGLE = 'MODAL_TOGGLE';
const MODAL_SET_OPTIONS = 'MODAL_SET_OPTIONS';
const MODAL_LOADING = 'MODAL_LOADING';

// ACTIONS
export function closeModal() {
  return { type: MODAL_TOGGLE };
}

export function toggleModal(open, opts = {}) {
  return (dispatch) => {
    if (open && opts) {
      dispatch({ type: MODAL_SET_OPTIONS, payload: opts });
    }
    dispatch({ type: MODAL_TOGGLE, payload: open });
  };
}

export function modalLoading(loading) {
  return { type: MODAL_LOADING, payload: loading };
}

export function setModalOptions(opts) {
  return { type: MODAL_SET_OPTIONS, payload: opts };
}

// REDUCER
const initialState = {
  open: false,
  loading: false,
  options: {
    className: '',
    children: null,
    childrenProps: null,
    size: ''
  }
};

export function modalReducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_TOGGLE:
      return {
        ...state,
        open: action.payload
      };
    case MODAL_SET_OPTIONS:
      return {
        ...state,
        options: action.payload
      };
    case MODAL_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
}
