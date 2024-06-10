const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingRedirect,
  authController.isLoggedIn,
  viewController.getOverview,
);

router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);

router.get('/login', authController.isLoggedIn, viewController.getLogin);

router.get('/forgot-password', viewController.forgotPassword);

router.get('/reset-password/:token', viewController.resetPassword);

router.post('/reset-password-action', viewController.resetPasswordAction);

router.get('/signup', viewController.signup);

router.get('/me', authController.protect, viewController.getAccount);

router.get('/my-tours', authController.protect, viewController.getMyTours);

router.get('/my-reviews', authController.protect, viewController.getMyReviews);

router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData,
);

module.exports = router;
