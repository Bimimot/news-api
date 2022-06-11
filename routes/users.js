const router = require('express').Router();
const auth = require('../middlewares/auth');

const { getUser } = require('../controllers/users');

router.use(auth);
router.get('/me', getUser);

module.exports = router;
