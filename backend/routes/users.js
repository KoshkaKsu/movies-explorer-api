const router = require('express').Router();
const {
  getUsers,
  updateProfile,
} = require('../controllers/users');
const { patchUserValidate } = require('../middlewares/validate');

router.get('/users/me', getUsers);
router.patch('/users/me', patchUserValidate, updateProfile);

module.exports = router;
