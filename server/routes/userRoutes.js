const express = require('express');
const { createAccount, loginAccount, checkCode, changePass, sendCode, getUser, addFriend, findFriend, findUser, listFriend, unFriend, checkFriend, sendFriendreq, unacceptFriendreq, listFriendreq } = require('../controller/userController');
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
router.get('/find-user', findUser);
router.get('/find-friend', findFriend);

//list
router.get('/list-friend/:id', listFriend);
router.get('/list-friendreq/:id', listFriendreq);
router.get('/check-friend/:userId/:friendId', checkFriend);

//add and decline
router.post('/add-friend/:userId/:friendId', sendFriendreq);
router.post('/decline-friend/:userId/:friendId', unacceptFriendreq);
//accept and unfriend
router.post('/accept-friend/:userId/:friendId', addFriend);
router.post('/un-friend/:userId/:friendId', unFriend);
module.exports = router;
