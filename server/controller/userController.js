const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
exports.createAccount = async (req, res) => {
    const { email, userName, password } = req.body;

    try {
        const existingUserName = await userModel.findOne({ userName: userName });
        if (existingUserName) {
            return res.status(400).send({
                success: false,
                message: 'This username is already registered'
            });
        }
        const existingEmail = await userModel.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).send({
                success: false,
                message: 'This email is already registered'
            });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new userModel({
            email,
            userName,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.loginAccount = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill both username and password fields'
            });
        }
        const user = await userModel.findOne({ userName: userName });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Credentials'
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            return res.status(200).json({ message: 'Login success' });
        } else {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
};