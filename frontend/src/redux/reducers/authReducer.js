import ACTIONS from "../actions/";

const initialState = {
  LoggedUser: [],
  isLogged: false,
  isAdmin: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case ACTIONS.GET_USER:
      return {
        ...state,
        LoggedUser: action.payload.user,
        isAdmin: action.payload.isAdmin,
      };
    default:
      return state;
  }
}
