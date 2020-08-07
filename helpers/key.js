const { NODE_ENV, JWT_SECRET } = process.env;
const cryptoKey = (NODE_ENV === 'production') ? JWT_SECRET : 'secret-key';
module.exports = { cryptoKey };
