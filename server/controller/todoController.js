const todoModel = require('../model/todoModel');

exports.createTodo = async (req, res) => {
    try {
        console.log(req.body);
        const newTodo = await new todoModel(req.body).save();
        res.json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.deleteTodo = async (req, res) => {
    try {
        const deleteTodo = await todoModel.findByIdAndDelete(req.params.id);
        if (!deleteTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(deleteTodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const updateTodo = await todoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(updateTodo)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });

    }
}

exports.getTodo = async (req, res) => {
    try {
        const getTodo = await todoModel.find({});
        if (!getTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(getTodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}