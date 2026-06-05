const express = require('express');

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const productSchema = require('../schemas/productSchema');
const controller = require('../controllers/productController');

const router = express.Router();

router.use(auth);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validate(productSchema), controller.create);
router.put('/:id', validate(productSchema), controller.update);
router.patch('/:id/toggle', controller.toggle);

module.exports = router;
