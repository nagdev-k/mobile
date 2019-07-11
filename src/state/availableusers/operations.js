import { axiosGet } from '../../axios';


export const getUsersOperation = () => (
  () => (
    axiosGet('/users')
      .then((res) => {
        console.log('get user operation', res.data);
        return res.data;
      })
      .catch((error) => {
        console.log('error in axios', error);
      })
  )
);

export const getChatsOperation = params => (
  () => (
    axiosGet('/conversations/findChats', params)
      .then((res) => {
        console.log('get user operation', res.data);
        return res.data;
      })
      .catch((error) => {
        console.log('error in axios', error);
      })
  )
);

export const findConversation = params => (
  () => (
    axiosGet('/conversations', params)
      .then((res) => {
        console.log('start conversation', res);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      })
  )
);
