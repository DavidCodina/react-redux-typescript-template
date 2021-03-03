import { INCREMENT_COUNT } from '../actions/types';


const initialState = {
  count: 0
};

// action:any is just a hack to get it working
const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + action.payload
      };

    default:
      return state;
  }
}

export default reducer;
