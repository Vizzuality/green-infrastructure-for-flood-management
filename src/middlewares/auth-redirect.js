import { replace } from 'react-router-redux';
import { publicRoutes } from 'constants/routes';

const authRedirectMiddleware = store => next => (action) => {
  const { logged } = store.getState().user;

  if (action.type === '@@router/LOCATION_CHANGE' && !logged && !publicRoutes.includes(action.payload.pathname)) {
    store.dispatch(replace('/login'));
  } else {
    next(action);
  }
};

export default authRedirectMiddleware;
