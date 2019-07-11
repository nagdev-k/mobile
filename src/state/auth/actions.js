import { signin, signout } from './types';

export const signinAction = data => ({
  type: signin,
  data,
});

export const signoutAction = () => ({
  type: signout,
});
