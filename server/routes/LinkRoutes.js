const express = require('express');
const { createLink, updateLink, deleteLink, getLink } = require('../controller/linkController');
const router = express.Router();

router.post('/create-link', createLink);
router.put('/update-link', updateLink);
router.delete('/delete-link/:id', deleteLink);
router.get('/get-link', getLink);
module.exports = router;