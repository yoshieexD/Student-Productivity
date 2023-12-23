const linkModel = require('../model/linkModel')

exports.createLink = async (req, res) => {
    try {
        const newLink = await new linkModel(req.body).save();
        res.json(newLink);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });

    }
}

exports.deleteLink = async (req, res) => {
    try {
        const deleteLink = await linkModel.findByIdAndDelete(req.params.id);
        if (!deleteLink) {
            return res.status(404).json({ error: 'Link not found' });
        }
        res.json(deleteLink);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateLink = async (req, res) => {
    try {
        const updateLink = await linkModel.findByIdAndUpdate(req.params.id, req.body);
        if (!updateLink) {
            return res.status(404).json({ error: 'Link not found' })
        }
        res.json(updateLink);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getLink = async (req, res) => {
    try {
        const getLink = await linkModel.find({});
        if (!getLink) {
            return res.status(404).json({ error: 'Link not found' })
        }
        res.json(getLink);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });

    }
}
