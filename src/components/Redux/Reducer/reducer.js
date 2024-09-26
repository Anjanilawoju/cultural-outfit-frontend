const initialState = {
    product: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        return {
          ...state,
          product: [...state.product, action.payload],
        };
      case "REMOVE_FROM_CART":
        return {
          ...state,
          product: state.product.filter(item => item.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  