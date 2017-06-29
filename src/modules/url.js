import { dispatch } from 'main';
import { replace } from 'react-router-redux';
import { setProjectsFilters, setProjectsDetail } from 'modules/projects';
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
    const { filters } = state.projects;
    const { map } = state;
    const { pathname } = window.location;

    const locationDescriptor = {
      pathname
    };

    if (pathname === '/map') {
      locationDescriptor.query = {
        filters: encode(filters),
        map: encode(map)
      };
    }

    dispatch(replace(locationDescriptor));
  };
}

function onEnterMapPage({ location }, replaceUrl, done) {
  const { filters, map } = location.query;
  if (filters) {
    const parsedFilters = decode(filters);
    dispatch(setProjectsFilters(parsedFilters));
  }
  if (map) {
    const parsedMap = decode(map);
    dispatch(setMapLocation(parsedMap));
  }

  dispatch(setProjectsDetail(null));
  done();
}

function onEnterProjectDetail({ params }, replaceUrl, done) {
  const { id } = params;
  dispatch(setProjectsDetail(+id || id));
  done();
}

function shouldUpdateScroll(prevRouterProps, { location }) {
  const noScrollSections = [];

  const path = (prevRouterProps && prevRouterProps.location.pathname.split('/')[1]) || '';
  const nextPath = location.pathname.split('/')[1];

  const test = (path === nextPath && noScrollSections.indexOf(nextPath) > -1);

  if (!test) {
    const el = document.getElementsByClassName('c-header');
    if (el.length) el[0].scrollIntoView();
  }

  return !test;
}


export { updateUrl, onEnterMapPage, onEnterProjectDetail, shouldUpdateScroll };
