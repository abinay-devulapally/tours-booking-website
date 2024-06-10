/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';

export const forgotPassword = (email) => {
  axios
    .post('/api/v1/users/forgotPassword', {
      email,
    })
    .then((res) => {
      if (res.data.status === 'success') {
        showAlert('success', 'Email Sent Successfully!');
        window.setTimeout(() => {
          location.assign('/login');
        }, 1000);
      }
    })
    .catch((err) => {
      showAlert('error', err.response.data.message);
    });
};

export const resetPassword = (token, password, passwordConfirm) => {
  axios
    .patch(`/api/v1/users/resetPassword/${token}`, {
      password,
      passwordConfirm,
    })
    .then((res) => {
      if (res.data.status === 'success') {
        showAlert('success', 'Password Reset Successfull!');
        window.setTimeout(() => {
          location.assign('/login');
        }, 1000);
      }
    })
    .catch((err) => {
      showAlert('error', err.response.data.message);
    });
};
