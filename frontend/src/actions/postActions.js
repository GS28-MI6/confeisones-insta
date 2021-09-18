import {
  ADD_COUNT
} from "./types";

export const startCount = () => dispatch => {
  let count = 0
  dispatch({
    type: ADD_COUNT,
    payload: count
  });
};

export const addOneToCount = (count) => dispatch => {
  console.log(count)
  count = count + 1
  dispatch({
    type: ADD_COUNT,
    payload: count
  });
};
