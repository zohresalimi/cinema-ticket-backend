const mongoose = require('mongoose');

require('dotenv').config();

const connect = async () => {
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
