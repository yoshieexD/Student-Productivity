const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

exports.registerEmail = async (email, userName, password) => {
    try {

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailDetails = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Successfully Created an Account',
            html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        line-height: 1.6;
                        margin: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                    }
                    .header {
                        background-color: #f4f4f4;
                        padding: 20px;
                        text-align: center;
                    }
                    .content {
                        padding: 20px;
                    }
                    .footer {
                        background-color: #f4f4f4;
                        padding: 10px;
                        text-align: center;
                    }
                    .disclaimer {
                        font-style: italic;
                        color: #888;
                        margin-top: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Account Created Successfully</h1>
                    </div>
                    <div class="content">
                        <p>Hello,</p>
                        <p>Thank you for creating an account. Here are your account details:</p>
                        <ul>
                            <li><strong>Username:</strong> ${userName}</li>
                            <li><strong>Password:</strong> ${password}</li>
                        </ul>
                        <p class="disclaimer">Please note: This email address is not monitored, so please do not reply to this email.</p>
                    </div>
                </div>
            </body>
        </html>
            `
        }
        await mailTransporter.sendMail(mailDetails);
        console.log('Email sent successfully');
    } catch (error) {
        console.error(error)
    }
}

exports.sendCode = async (email, code) => {
    try {
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailDetails = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Verification Code Created Successfully',
            html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        line-height: 1.6;
                        margin: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                    }
                    .header {
                        background-color: #f4f4f4;
                        padding: 20px;
                        text-align: center;
                    }
                    .content {
                        padding: 20px;
                    }
                    .footer {
                        background-color: #f4f4f4;
                        padding: 10px;
                        text-align: center;
                    }
                    .disclaimer {
                        font-style: italic;
                        color: #888;
                        margin-top: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Verification Code Created Successfully</h1>
                    </div>
                    <div class="content">
                        <p>Hello,</p>
                        <p>Your Verification Code has been generated:</p>
                        <ul>
                            <li><strong>Verification Code:</strong>${code}</li>
                        </ul>
                        <p class="disclaimer">Please note: This email address is not monitored, so please do not reply to this email.</p>
                    </div>
                </div>
            </body>
        </html>
            `
        }
        await mailTransporter.sendMail(mailDetails);
        console.log('Email sent successfully');
    } catch (error) {

    }
}