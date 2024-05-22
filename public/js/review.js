/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';

export const manageReview = async (reviewId, data) => {
  try {
    console.log('ReviewId:', reviewId);
    console.log(data);
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/reviews/${reviewId}`,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Review updated successfully!');
      return true; // Indicate success
    } else {
      return false; // Indicate failure
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    return false; // Indicate failure
  }
};
