const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { exit } = require('process');

dotenv.config({ path: './config.env' });

if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  console.error('Database_url or database password is missing.');
  process.exit(1);
}

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception 💥 shutting down.');
  console.error(err);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => console.log('Connected to database.'))
  .catch((err) => {
    console.log('DB failed to connect', err.message);
    process.exit(1);
  });

const port = process.env.PORT || 8000;
const app = require('./app'); //Ensure app file is correctly required

const server = app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});
