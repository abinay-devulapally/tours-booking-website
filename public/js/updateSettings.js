/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    console.log(data, type); // This should log on every call
    const url =
      type === 'password'
        ? '/api/v1/users/updatePassword'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
      return true; // Indicate success
    } else {
      return false; // Indicate failure
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    return false; // Indicate failure
  }
};
