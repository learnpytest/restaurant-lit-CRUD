/* config.js */
const config = {
  env: 'development',
  port: 3000,
  mongoose: {
    url: 'mongodb://127.0.0.1:27017/restaurant-list',
    params: { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
  }
}
module.exports = config