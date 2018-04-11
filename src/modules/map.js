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
  layersActive: ['layer1']
};

/* Reducer */
function mapReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MAP_LOCATION:
      return Object.assign({}, state, action.payload);
    case RESET_MAP_STATE:
      return initialState;
    case TOGGLE_LAYER: {
      const newLayersActive = state.layersActive.includes(action.payload) ?
        state.layersActive.slice().filter(l => l !== action.payload) :
        state.layersActive.slice().concat(action.payload);

      return Object.assign({}, state, { layersActive: newLayersActive });
    }
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
  return { type: RESET_MAP_STATE };
}

function toggleLayer(id) {
  return {
    type: TOGGLE_LAYER,
    payload: id
  };
}

export { mapReducer, setMapLocation, resetMapState, toggleLayer };
