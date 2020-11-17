const INITIAL_STATE = {
    duration: 10000,
    items:[],
    files:[]
    
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'SET_DATA':
        return {
          ...state,
          ...action.payload,
        };
     
      default:
        // Return the initial state when no action types match.
        return state;
    }
  };
  