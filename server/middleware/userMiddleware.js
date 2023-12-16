const userModel = require('../model/userModel');

exports.authCheck = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'This user does not exist' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error in authCheck:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
