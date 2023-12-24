const pomorodoModel = require('../model/pomorodoModel');

exports.createPomorodo = async (req, res) => {
    try {
        const newPomorodo = await new pomorodoModel(req.body).save();
        res.json(newPomorodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getPomorodo = async (req, res) => {
    try {
        const getPomorodo = await pomorodoModel.find({});
        if (!getPomorodo) {
            return res.status(404).json({ error: 'pomorodo not found' });
        }
        res.json(getPomorodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });

    }
}