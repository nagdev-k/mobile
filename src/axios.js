import axios from 'axios';
import baseUrl from './constants/baseUrl';

const axiosObj = () => (
  axios.create({
    baseURL: baseUrl,
    headers: {},
  })
);

export const axiosGet = (url, params) => new Promise((resolve, reject) => {
  axiosObj().get(url, {
    params,
  }).then(response => resolve(response))
    .catch(error => reject(error));
});

export const axiosPost = (url, params) => new Promise((resolve, reject) => {
  axiosObj().post(url, params).then(response => resolve(response)).catch(error => reject(error));
});
