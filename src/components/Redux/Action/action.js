  
  export const addToCart = (product) => ({
    type: "ADD_TO_CART",
    payload: product,
  });
  
  export const increment = () => ({
    type: "increment"
  });
  
  export const decrement = () => ({
    type: "decrement"
  });
  
  export const add = (id) => ({
    type: "add",
    id
  });
  
  export const remove = (id) => ({
    type: "remove",
    id
  });
  