const chatModel = require('../model/chatModel');
const userModel = require('../model/userModel');

exports.createChat = async (req, res) => {
    try {
        const sender = await userModel.findById(req.params.userId);
        const receiver = await userModel.findById(req.params.friendId);
        if (!sender || !receiver) {
            return res.status(404).json({ message: 'receiver or sender not found' });
        }
        const newChat = new chatModel({
            users: [
                {
                    sender: req.params.userId,
                    receiver: req.params.friendId
                }
            ],
            messages: [{
                sender: req.params.userId,
                content: req.body.content
            }],
        });
        const savedChat = await newChat.save();

        res.json(savedChat);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getChat = async (req, res) => {
    try {
        const sender = await userModel.findById(req.params.userId);
        const receiver = await userModel.findById(req.params.friendId);

        if (!sender || !receiver) {
            return res.status(404).json({ error: 'User not found' });
        }

        const chat = await chatModel.find({
            users: {
                $elemMatch: { sender: sender._id, receiver: receiver._id }
            }
        });

        res.json(chat);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUser = async (req, res) => {
    try {
        const sender = await userModel.findOne({ _id: req.params.userId });
        const receiver = await userModel.findOne({ _id: req.params.friendId });
        res.json({ sender, receiver })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
