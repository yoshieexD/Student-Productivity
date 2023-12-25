const notesModel = require('../model/notesModel')

exports.createNotes = async (req, res) => {
    try {
        const newNotes = await new notesModel(req.body).save();
        res.json(newNotes);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getNotes = async (req, res) => {
    try {
        const getNotes = await notesModel.find({});
        if (!getNotes) {
            return res.status(404).json({ error: 'Notes not found' });
        }
        res.json(getNotes);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateNotes = async (req, res) => {
    try {
        const updateNotes = await notesModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateNotes) {
            return res.status(404).json({ error: 'Notes not found' });
        }
        res.json(updateNotes);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.deleteNotes = async (req, res) => {
    try {
        const deleteNotes = await notesModel.findByIdAndDelete(req.params.id);
        if (!deleteNotes) {
            return res.status(404).json({ error: 'Notes not found' });
        }
        res.json(deleteNotes);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getNotesId = async (req, res) => {
    try {
        const getNotesId = await notesModel.findById(req.params.id);
        if (!getNotesId) {
            return res.status(404).json({ error: 'Notes not found' });
        }
        res.json(getNotesId);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}