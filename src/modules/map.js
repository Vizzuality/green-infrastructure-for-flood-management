import { get } from 'utils/request';

/* Constants */
const SET_MAP_LOCATION = 'SET_MAP_LOCATION';
const RESET_MAP_STATE = 'RESET_MAP_STATE';

/* Initial state */
const initialState = {
  latLng: {
    lat: 30,
    lng: -40
  },
  zoom: 3
};

/* Reducer */
function mapReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MAP_LOCATION:
      return Object.assign({}, state, action.payload);
    case RESET_MAP_STATE:
      return initialState;
    default:
      return state;
  }
}

/* Action creators */
function setMapLocation(locationParams) {
  return {
    type: SET_MAP_LOCATION,
    payload: locationParams
  };
}

function resetMapState() {
  return {
    type: RESET_MAP_STATE
  };
}

export { mapReducer, setMapLocation, resetMapState };
