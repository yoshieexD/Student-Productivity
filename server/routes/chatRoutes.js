const express = require('express');
const { createChat, getChat, getUser } = require('../controller/chatController');
const router = express.Router();

router.post('/create-chat/:userId/:friendId', createChat);
router.get('/get-chat/:userId/:friendId', getChat);
router.get('/get-user/:userId/:friendId', getUser);
module.exports = router;