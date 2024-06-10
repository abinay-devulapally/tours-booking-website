/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { forgotPassword, resetPassword } from './forgotPassword';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { manageReview } from './review';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const forgetPasswordForm = document.querySelector('.form--forgot-password');
const resetPasswordForm = document.querySelector('.form--reset-password');
const signForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-settings');
const bookBtn = document.getElementById('book-tour');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (signForm)
  signForm.addEventListener('submit', (el) => {
    el.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirm-password').value;
    signup(name, email, password, passwordConfirm);
  });

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (forgetPasswordForm)
  forgetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgotPassword(email);
  });

if (resetPasswordForm)
  resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const token = document.getElementById('token').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    resetPassword(token, password, passwordConfirm);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    // console.log(form);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const currentPassword = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { currentPassword, password, passwordConfirm },
      'password',
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

// Review editing functionality
document.addEventListener('DOMContentLoaded', function () {
  // Function to handle the star click events
  function handleStarClick(stars, rating) {
    stars.forEach(function (s, index) {
      if (index < rating) {
        s.classList.add('reviews__star--active');
        s.classList.remove('reviews__star--inactive');
      } else {
        s.classList.remove('reviews__star--active');
        s.classList.add('reviews__star--inactive');
      }
    });
  }

  // Find all review cards and add event listeners
  document.querySelectorAll('.reviews__card').forEach(function (card) {
    const stars = card.querySelectorAll('.reviews__star');
    const saveButton = card.querySelector('.reviews__save-button');
    const textarea = card.querySelector('.reviews__textarea');
    const reviewId = card.getAttribute('data-review-id');

    stars.forEach(function (star) {
      star.addEventListener('click', function () {
        const rating = parseInt(this.getAttribute('data-star'));
        handleStarClick(stars, rating);
      });
    });

    saveButton.addEventListener('click', function () {
      const review = textarea.value;
      const rating = card.querySelectorAll('.reviews__star--active').length;

      manageReview(reviewId, { review, rating });

      // Here, you can send the reviewText and rating to your server
    });
  });
});
