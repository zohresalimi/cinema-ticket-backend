const mongoose = require('mongoose');

const envFiles = {
  development: '.env',
  production: '.env.production',
  test: '.env.test',
};

require('dotenv').config({ path: envFiles[process.env.NODE_ENV] });

const connect = async () => {
  // eslint-disable-next-line no-console
  const mongoConnectionString = process.env.MONGO_URI;
  try {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };

    await mongoose.connect(mongoConnectionString, opts);
  } catch (err) {
    throw new Error(
      `Fail to connect with database ${mongoConnectionString}`,
      err
    );
  }
};

module.exports = { connect };
