const express = require('express');
const { createAccount, loginAccount } = require('../controller/userController');
const router = express.Router();
router.post('/create-user', createAccount);
router.post('/login-user', loginAccount);

module.exports = router;
