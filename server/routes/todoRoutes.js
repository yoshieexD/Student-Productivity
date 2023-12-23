const express = require('express');
const { createTodo, updateTodo, deleteTodo, getTodo } = require('../controller/todoController');
const router = express.Router();
router.post('/create-todo', createTodo);
router.put('/update-todo', updateTodo);
router.delete('/delete-todo', deleteTodo);
router.get('/get-todo', getTodo);
module.exports = router;