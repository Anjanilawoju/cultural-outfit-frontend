import { combineReducers } from 'redux';

const first = 0;
const changeCartItem = (state = first, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
};

const products = [];
const product = (state = products, action) => {
  switch (action.type) {
    case "add":
      if (!state.includes(action.id)) {
        return [...state, action.id];
      }
      return state;
    case "remove":
      return state.filter((item) => item !== action.id);
    default:
      return state;
  }
};

const root = combineReducers({
  changeCartItem,
  product
});

export default root;
