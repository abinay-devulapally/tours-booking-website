/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';

export const login = (email, password) => {
  axios
    .post('/api/v1/users/login', {
      email,
      password,
    })
    .then((res) => {
      if (res.data.status === 'success') {
        showAlert('success', 'Login successful');
        window.setTimeout(() => {
          location.assign('/');
        }, 1000);
      }
    })
    .catch((err) => {
      showAlert('error', err.response.data.message);
    });
};

export const logout = () => {
  axios
    .get('/api/v1/users/logout')
    .then((res) => {
      if ((res.data.status = 'success')) location.reload(true);
    })
    .catch((err) => {
      showAlert('error', 'Error while logging out');
    });
};
