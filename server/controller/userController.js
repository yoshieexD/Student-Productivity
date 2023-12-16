const userModel = require('../model/userModel');
const emailHelper = require('../helper/emailHelper');
const bcrypt = require('bcrypt');
const generator = require('generate-password');
exports.createAccount = async (req, res) => {
    const { email, userName } = req.body;
    try {
        const existingUserName = await userModel.findOne({ userName: userName });
        if (existingUserName) {
            return res.status(400).send({
                success: false,
                message: 'This username is already exist'
            });
        }
        const existingEmail = await userModel.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).send({
                success: false,
                message: 'This email is already exist'
            });
        }
        const password = generator.generate({
            length: 10,
            numbers: true
        })
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            email,
            userName,
            password: hashedPassword,
        });
        await emailHelper.registerEmail(email, userName, password);
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
exports.sendCode = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'The email doesn\'t exist'
            });
        }
        const codes = generator.generate({
            length: 5,
            numbers: true,
        });
        const date = new Date();
        const updateAccount = await userModel.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    'code.used': false,
                    'code.code': codes,
                    'code.timer': date.setMinutes(date.getMinutes() + 3),
                }
            },
            { new: true }
        );
        await emailHelper.sendCode(email, codes)
        return res.json(updateAccount);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

exports.checkCode = async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await userModel.findOne({ email: email });
        if (!user) {
            res.status(400).send({
                success: false,
                message: 'This email doesnt exist'
            })
        }
        const currentDate = Date.now();
        if (user.code.code !== code || user.code.timer <= currentDate || user.code.used === true) {
            res.status(400).send({
                success: false,
                message: 'Invalid Verification Code',
            })
        }

        const updateAccount = await userModel.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    'code.used': true,
                }
            },
            { new: true }
        );
        res.json(updateAccount)
    } catch (error) {
        console.error(error);
    }
}
exports.changePass = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'User not found',
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await userModel.findByIdAndUpdate(
            user._id,
            { password: hashedPassword },
            { new: true }
        );
        return res.json(updatedUser);
    } catch (error) {
        console.error(error);
    }
}