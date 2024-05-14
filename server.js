const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION: Shutting down the server');
  console.log(err.name, err.message, err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// const connectionOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful'))
  .catch((err) => console.error('DB connection error:', err));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION: Shutting down the server');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
