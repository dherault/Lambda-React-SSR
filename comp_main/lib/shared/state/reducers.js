import { logReducer } from '../utils/logger';

const reducers = {
  users: (state={}, { type, params, payload }) => { // Declaring those 3 variables everytime is only for dev purposes
    
    logReducer(type); // keep this line in the first reducer
    
    switch (type) {
      
      default:
        return state;
    }
  },
  
  // Side effects and logging reducers
  records: (state=[], action) => [...state, Object.assign({ date: new Date().getTime() }, action)],
};

export default reducers;
