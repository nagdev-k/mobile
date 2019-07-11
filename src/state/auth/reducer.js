import { signin, signout } from './types';

const initialState = {
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case signin:
      return {
        ...state,
        user: action.data,
      };
    case signout:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default reducer;
