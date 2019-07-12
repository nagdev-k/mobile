import { axiosGet } from '../../axios';
import { newUsers, editNewUserMessageList } from './actions';

export const getUsersOperation = () => (
  () => (
    axiosGet('/users')
      .then(res => res.data)
      .catch((error) => {
        console.log('error in axios', error);
      })
  )
);

export const getChatsOperation = params => (
  dispatch => (
    axiosGet('/conversations/findChats', params)
      .then((res) => {
        console.log('in get chats', params);
        if (params.newUser) {
          console.log('new user found');
          dispatch(newUsers(res.data));
        }
        return res.data;
      })
      .catch((error) => {
        console.log('error in axios', error);
      })
  )
);

export const findConversation = params => (
  dispatch => (
    axiosGet('/conversations', params)
      .then((res) => {
        dispatch(editNewUserMessageList(params));
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      })
  )
);
