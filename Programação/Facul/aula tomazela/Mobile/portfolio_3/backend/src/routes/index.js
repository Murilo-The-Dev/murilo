const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/clients', require('./clients'));
router.use('/sales', require('./sales'));
router.use('/receivables', require('./receivables'));
router.use('/reports', require('./reports'));

module.exports = router;
