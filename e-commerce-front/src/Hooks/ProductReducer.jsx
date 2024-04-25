export default function ProductReducer(state, action) {
  console.log("Current state before update:", state);
  switch (action.type) {
    case "SET_PRODUCTS":
      if (JSON.stringify(state.products) === JSON.stringify(action.payload)) {
        console.log("Received identical state update, ignoring.");
        return state; // Ignore the update if it's identical to the current state
      }
      return { ...state, products: action.payload };

    default:
      return state;
  }
}
