const express = require('express');

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const saleSchema = require('../schemas/saleSchema');
const controller = require('../controllers/saleController');

const router = express.Router();

router.use(auth);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validate(saleSchema), controller.create);
router.patch('/:id/cancel', controller.cancel);

module.exports = router;
