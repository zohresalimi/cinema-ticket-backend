const mongoose = require('mongoose');

const dbNames = {
  production: 'cinema-ticket',
  test: 'test-cinema-ticket',
  development: 'dev-cinema-ticket',
};

const envFiles = {
  development: '.env',
  test: '.env.test',
};

require('dotenv').config({ path: envFiles[process.env.NODE_ENV] });

const connect = async () => {
  const mongoConnectionString = `${process.env.MONGO_URI}${
    dbNames[process.env.NODE_ENV]
  }`;
  try {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
