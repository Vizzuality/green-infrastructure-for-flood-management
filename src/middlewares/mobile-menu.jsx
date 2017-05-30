import { toggleMobileMenu } from 'modules/ui';

const mobileMenuMiddleware = store => next => (action) => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    store.dispatch(toggleMobileMenu(false));
  }
  next(action);
};

export default mobileMenuMiddleware;
