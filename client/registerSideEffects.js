import { routeActions } from 'react-router-redux';
import ac from '../comp_main/lib/shared/state/actionCreators';
import { createLogger } from '../comp_main/lib/shared/utils/logger';

const log = createLogger({
  prefix: '.E.',
  textClient: 'White',
  backgroundClient: 'Gold',
});

export default function registerSideEffects(store, ...additionnalSideEffects) {
  
  // Side effects 
  const sideEffects = {
    // YOLO: (state, action, dispatch) => dispatch(routeActions.push('/@' + action.payload.username));
  
  };
  
  // Lets add the additionnalSideEffects to the old ones
  const finalSideEffects = Object.assign({}, sideEffects);
  
  additionnalSideEffects.forEach(ase => {
    for (let key in ase) {
      const existant = finalSideEffects[key];
      
      // if a SE allready exists, then both are invoked in a new function
      if (existant) finalSideEffects[key] = (s, a, d) => {
        existant(s, a, d);
        ase[key](s, a, d);
      };
      else finalSideEffects[key] = ase[key];
    }
  });
  
  const seKeys = Object.keys(finalSideEffects);
  log(`Registering ${seKeys.length} side effects: ${seKeys.join(', ')}`);
  
  let recordsIndex = 0;
  const { getState, dispatch } = store;
  
  store.subscribe(() => {
    
    const state = getState();
    const records = state.records;
    const recordsLength = records.length;
    
    // Looks for new action records and checks for associated side effects
    for (let i = recordsIndex; i < recordsLength; i++) {
      recordsIndex++; // Don't use recordsIndex as the loop variable, bad things happen if a SE dispatches
      const action = records[i];
      const se = finalSideEffects[action.type];
      if (se) {
        log('Found side effect for', action.type);
        se(state, action, dispatch);
      }
    }
    
  });
}
