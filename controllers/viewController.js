const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next, val) => {
  // get tour data
  const tours = await Tour.find();

  // build template

  // render that template using tour data
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next, val) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  if (!tour) {
    return next(new AppError('There is no Tour with this name', 404));
  }

  res.status(200).render('tour', {
    title: tour.name,
    tour,
  });
});

exports.getLogin = (req, res) => {
  res.status(200).render('login', {
    title: 'Login',
  });
};

exports.forgotPassword = (req, res) => {
  res.status(200).render('forgot-password', {
    title: 'forgot-password',
  });
};

exports.resetPassword = (req, res) => {
  const { token } = req.params;
  res.status(200).render('reset-password', {
    title: 'reset-password',
    token,
  });
};

exports.resetPasswordAction = (req, res) => {
  res.status(200).render('reset-password-action', {
    title: 'reset-password',
  });
};

exports.signup = (req, res) => {
  res.status(200).render('signup', {
    title: 'signup',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'My account',
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

exports.getMyReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user.id });
  const tourIDs = reviews.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });
  const tourNames = tours.map((el) => el.name);
  res.status(200).render('reviewOverview', {
    title: 'My Reviews',
    reviews: reviews,
    tourNames: tourNames,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});
