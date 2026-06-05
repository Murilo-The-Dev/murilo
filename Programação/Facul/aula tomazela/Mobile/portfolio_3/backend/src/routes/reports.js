const express = require('express');

const auth = require('../middlewares/auth');
const controller = require('../controllers/reportController');

const router = express.Router();

router.use(auth);

router.get('/sales', controller.sales);
router.get('/receivables', controller.receivables);
router.get('/top-products', controller.topProducts);

module.exports = router;
