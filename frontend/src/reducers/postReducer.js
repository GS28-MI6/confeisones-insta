import { ADD_COUNT } from '../actions/types';

const initialState = {
  count: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_COUNT:
      return {
        ...state,
        count: action.payload
      };
    default:
      return state;
  }
}