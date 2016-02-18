export default function promiseMiddleware({ dispatch, getState }) {
  
  return next => action => {
    const { types, params, promise } = action;
    
    if (!promise) return next(action);
    
    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ params, type: REQUEST });
    
    promise
    .then(payload => next({ params, payload, type: SUCCESS }))
    .catch(payload => next({ params, payload, type: FAILURE }));
  };
}
