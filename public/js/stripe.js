/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51PFtEzLSB7PSDpl8bKVvEcWck1pU9yCChIuAF4DmIFsIEW1XkzL2tD7YKqre0fZ5GfjTvl1BZ6vRoYf7N1ggsc7400fTndIUMI',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/booking/checkout-session/${tourId}`);
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
