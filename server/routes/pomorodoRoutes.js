const express = require('express');
const { createPomorodo, getPomorodo } = require('../controller/pomorodoController');

const router = express.Router();
router.post('/create-pomorodo', createPomorodo);
router.get('/get-pomorodo', getPomorodo);
module.exports = router;