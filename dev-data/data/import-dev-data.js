const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

dotenv.config({ path: '../../config.env' });

//DB LOCAL CONNECTION
// const DB_LOCAL = process.env.DATABASE_LOCAL;

// mongoose
//   .connect(DB_LOCAL)
//   .then(() => console.log('LOCAL DB connection successful'))
//   .catch((err) => console.error('LOCAL DB connection error:', err));

//ONLINE DB CONNECTION

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successfull');
  });

let tours;
let users;
let reviews;

try {
  tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
  users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
  reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));
} catch (err) {
  console.error('Error reading files:', err);
}

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully Loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data Deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
