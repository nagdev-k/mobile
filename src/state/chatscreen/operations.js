import RNFetchBlob from 'rn-fetch-blob';

import baseUrl from '../../constants/baseUrl';
import { axiosGet, axiosPost } from '../../axios';

export const getMessages = params => (
  () => (
    axiosGet('/messages', params)
      .then((res) => {
        console.log('get message res', res.data);
        return res.data;
      })
  )
);

export const saveMessage = params => (
  () => (
    axiosPost('/messages/newMessage', params)
      .then((res) => {
        console.log('get message res', res.data);
        return res.data;
      })
      .catch((err) => {
        console.log('axios', err);
      })
  )
);

export const uploadImage = params => (
  () => (
    RNFetchBlob.fetch('POST', `${baseUrl}/messages/uploadImage`, {
      'Content-Type': 'multipart/form-data',
    }, [
      {
        name: 'file',
        filename: `${params.senderId}-${params.conversationId}.png`,
        type: 'image/png',
        data: RNFetchBlob.wrap(params.uri),
      },
    ]).then((resp) => {
      const data = JSON.parse(resp.data);
      console.log('success in file upload', data);
      return data;
    }).catch((error) => {
      console.log('error in uploading file', error);
      return false;
    })
  )
);
