const INITAIL_STATE = {
  todoLists: [],
};

const todoReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case "SET_TODO":
      return { ...state, todoLists: action.payload };
    default:
      return state;
  }
};

export default todoReducer;
