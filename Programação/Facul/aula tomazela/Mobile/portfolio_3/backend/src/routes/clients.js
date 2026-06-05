const express = require('express');

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const clientSchema = require('../schemas/clientSchema');
const controller = require('../controllers/clientController');

const router = express.Router();

router.use(auth);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validate(clientSchema), controller.create);
router.put('/:id', controller.update);
router.patch('/:id/toggle', controller.toggle);

module.exports = router;
