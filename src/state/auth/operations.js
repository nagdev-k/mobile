import { axiosPost } from '../../axios';
import { signinAction } from './actions';


const signInOperation = params => (
  dispatch => (
    axiosPost('/users/findUser', params)
      .then((res) => {
        if (Array.isArray(res.data)) {
          dispatch(signinAction(res.data[0]));
        } else {
          dispatch(signinAction(res.data));
        }
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      })
  )
);

export default signInOperation;
