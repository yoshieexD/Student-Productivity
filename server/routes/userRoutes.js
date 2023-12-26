const express = require('express');
const { createAccount, loginAccount, checkCode, changePass, sendCode, getUser, addFriend, findFriend, findUser, listFriend, unFriend } = require('../controller/userController');
const { authCheck } = require('../middleware/userMiddleware');
const router = express.Router();
router.post('/create-user', createAccount);
router.post('/login-user', loginAccount);
router.post('/send-code', sendCode);
router.post('/check-code', checkCode);
router.post('/change-pass', changePass);

router.post('/auth-check/:id', authCheck);
router.get('/get-user/:id', getUser);

//friends 
router.get('/find-user/:userName', findUser);
router.get('/find-friend', findFriend);
router.get('/list-friend/:id', listFriend);
router.post('/add-friend/:userId/:friendId', addFriend);
router.post('/un-friend/:userId/:friendId', unFriend);
module.exports = router;
