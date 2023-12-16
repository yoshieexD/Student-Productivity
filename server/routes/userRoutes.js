const express = require('express');
const { createAccount, loginAccount, checkCode, changePass, sendCode } = require('../controller/userController');
const router = express.Router();
router.post('/create-user', createAccount);
router.post('/login-user', loginAccount);
router.post('/send-code', sendCode);
router.post('/check-code', checkCode);
router.post('/change-pass', changePass);
module.exports = router;
