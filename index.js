const { connect } = require('./config/database');
const app = require('./app');

const port = process.env.PORT || 8080;

connect();
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`server is running on port ${port} .....`));
