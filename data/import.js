/* eslint-disable no-console */
process.env.DEBUG = 'mongo-seeding';
const { Seeder } = require('mongo-seeding');
const path = require('path');

const envFiles = {
  development: '.env',
  test: '.env.test',
};

require('dotenv').config({ path: envFiles[process.env.NODE_ENV] });

const config = {
  database: {
    name: 'dev-cinema-ticket',
  },
  dropDatabase: true,
  dropCollections: true,
};

const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve('./data'));
(async () => {
  try {
    console.log('preloading Test Data');
    await seeder.import(collections);
    console.log('data was successfully imported');
  } catch (e) {
    console.log(e);
  }
})();
