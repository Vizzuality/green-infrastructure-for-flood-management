import { get } from 'utils/request';

/* Constants */
const SET_MAP_LOCATION = 'SET_MAP_LOCATION';
const RESET_MAP_STATE = 'RESET_MAP_STATE';
const TOGGLE_LAYER = 'TOGGLE_LAYER';

/* Initial state */
const initialState = {
  latLng: {
    lat: 30,
    lng: -40
  },
  zoom: 3,
  layerActive: true
};

/* Reducer */
function mapReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MAP_LOCATION:
      return Object.assign({}, state, action.payload);
    case RESET_MAP_STATE:
      return initialState;
    case TOGGLE_LAYER:
      return Object.assign({}, state, { layerActive: !state.layerActive });
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

function toggleLayer() {
  return {
    type: TOGGLE_LAYER
  };
}

export { mapReducer, setMapLocation, resetMapState, toggleLayer };
