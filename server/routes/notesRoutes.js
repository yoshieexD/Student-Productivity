const express = require('express');
const { getNotes, deleteNotes, updateNotes, createNotes, getNotesId } = require('../controller/noteController');
const router = express.Router();

router.post('/create-notes', createNotes);
router.put('/update-notes/:id', updateNotes);
router.delete('/delete-notes/:id', deleteNotes);
router.get('/get-notes', getNotes);
router.get('/get-notes/:id', getNotesId);

module.exports = router;