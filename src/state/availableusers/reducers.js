import { cloneDeep } from 'lodash';

const initialState = {
  newUserMessage: [],
};

const newUserMessage = (state = initialState, action) => {
  const newUserMessageClone = cloneDeep(state.newUserMessage);
  switch (action.type) {
    case 'NEW_USER':
      return {
        ...state,
        newUserMessage: action.data,
      };
    case 'REMOVE_USER_FROM_LIST':
      newUserMessageClone.splice(newUserMessageClone.findIndex(e => e._id === action.data.recieverId), 1);
      return {
        ...state,
        newUserMessage: [...newUserMessageClone],
      };
    default:
      return state;
  }
};

export default newUserMessage;
