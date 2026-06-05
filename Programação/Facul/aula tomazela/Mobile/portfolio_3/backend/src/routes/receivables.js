const express = require('express');

const auth = require('../middlewares/auth');
const controller = require('../controllers/receivableController');

const router = express.Router();

router.use(auth);

router.get('/', controller.getAll);
router.patch('/:id/pay', controller.pay);

module.exports = router;
