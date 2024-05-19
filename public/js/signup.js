/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';

export const signup = (name, email, password, passwordConfirm) => {
  console.log(name, email, password, passwordConfirm);
  axios
    .post('/api/v1/users/signup', {
      name,
      email,
      password,
      passwordConfirm,
    })
    .then((res) => {
      if (res.data.status === 'success') {
        showAlert('success', 'Account Created successful');
        window.setTimeout(() => {
          location.assign('/');
        }, 1000);
      }
    })
    .catch((err) => {
      console.log(err);
      showAlert('error', err.response.data.message);
    });
};
