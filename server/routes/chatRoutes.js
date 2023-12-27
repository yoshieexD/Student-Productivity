const express = require('express');
const { createChat, getChat } = require('../controller/chatController');
const router = express.Router();

router.post('/create-chat/:userId/:friendId', createChat);
router.get('/get-chat/:userId/:friendId', getChat);
module.exports = router;