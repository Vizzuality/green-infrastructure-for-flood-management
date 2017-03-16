import { dispatch } from 'main';
import { replace } from 'react-router-redux';
import { setProjectFilters, setProjectSearch, setProjectDetail } from 'modules/projects';
import { setMapLocation } from 'modules/map';

/* Aux functions */
function encode(obj) {
  return btoa(JSON.stringify(obj));
}

function decode(obj) {
  return JSON.parse(atob(obj));
}

/* Actions */
function updateUrl() {
  return (storeDispatch, getState) => {
    const state = getState();
    const { search, filters, detail } = state.projects;
    const { map } = state;

    const locationDescriptor = {
      pathname: '/map',
      query: {
        map: encode(map),
        search,
        filters: encode(filters),
        detail
      }
    };
    storeDispatch(replace(locationDescriptor));
  };
}

function onEnterMapPage({ location }, replaceUrl, done) {
  const { filters, search, map, detail } = location.query;
  if (filters) {
    const parsedFilters = decode(filters);
    dispatch(setProjectFilters(parsedFilters));
  }
  if (search) {
    dispatch(setProjectSearch(search));
  }
  if (map) {
    const parsedMap = decode(map);
    dispatch(setMapLocation(parsedMap));
  }
  if (detail) {
    dispatch(setProjectDetail(detail));
  }

  done();
}

export { updateUrl, onEnterMapPage };