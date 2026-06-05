const express = require('express');

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const userSchema = require('../schemas/userSchema');
const controller = require('../controllers/userController');

const router = express.Router();

router.use(auth);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validate(userSchema), controller.create);
router.put('/:id', controller.update);
router.patch('/:id/toggle', controller.toggle);

module.exports = router;
