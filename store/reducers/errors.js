import { HYDRATE } from "next-redux-wrapper";
const initialState = {
  messages: [],
  hydrated: false,
};
let id = 0;

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      if (!state.hydrated) {
        return { ...state, ...action.payload.errors, hydrated: true };
      }
      return state;
    case "ADD_ERROR_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, { id: (id += 1), text: action.message }],
      };
    case "REMOVE_ERROR_MESSAGE":
      return {
        ...state,
        messages: state.messages.filter((message) => message.id !== action.id),
      };
    default:
      return state;
  }
};
export default errorsReducer;
