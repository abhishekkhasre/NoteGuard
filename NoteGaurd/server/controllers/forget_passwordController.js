const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const PasswordUser = require('../models/PasswordUser');
require('dotenv').config();

const forgetPasswordController = {};


// Show the forget password form
forgetPasswordController.getForgetPassword = (req, res) => {
  res.render('password/forgetPassword', { error: null });
};

// Handle forget password form submission
forgetPasswordController.postForgetPassword = async (req, res) => {
  const { email } = req.body;
//   console.log(email)
  try {
    const existingUser = await PasswordUser.findOne({ email }).where({ user: req.user.id });
    // console.log(existingUser);
    if (!existingUser) {
      return res.render('password/forgetPassword', { error: 'User not found' });
    }

    // Generate reset token and set the expiry time
    const token = crypto.randomBytes(32).toString('hex');
    existingUser.resetToken = token;
    existingUser.resetTokenExpiry = Date.now() + 60 * 60 * 1000; // Token will expire in 1 hour
    await existingUser.save();

    // Send reset password email to the user
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Set your email service provider here
        auth: {
          user: 'worryingminds123@gmail.com', // Your email address
          pass: process.env.nodemailerPassword, // Your email password or app password (if using Gmail)
        },
      });


    await transporter.sendMail({
      from: 'worryingminds123@gmail.com',
      to: email,
      subject: 'Password Reset',
      html: `
        <p>You requested a password reset</p>
        <p>Click <a href="http://${req.headers.host}/password/reset-password/${existingUser._id}/${token}">here</a> to reset your password</p>
      `,
    });

    // Redirect to a page saying that an email has been sent for password reset
    res.render('password/forgetPassword', { error: 'An email has been sent for password reset' });
  } catch (error) {
    console.error(error);
    res.render('password/forgetPassword', { error: 'Something went wrong' });
  }
};

// Show the reset password form
forgetPasswordController.getResetPassword = async (req, res) => {
  const { id, token } = req.params;
  console.log(id);
  try {
    const user = await PasswordUser.findOne({
      _id: id,
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.redirect('/password/login');
    }

    // Render the reset password form with the user ID and token
    res.render('password/resetPassword', { userId: user._id, token });
  } catch (error) {
    console.error(error);
    res.redirect('/password/login');
  }
};

// Handle reset password form submission
forgetPasswordController.postResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const user = await PasswordUser.findOne({
      _id: id,
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.redirect('/password/login');
    }

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    // Redirect to the login page after a successful password reset
    res.redirect('/password/login');
  } catch (error) {
    console.error(error);
    res.redirect('/password/login');
  }
};

module.exports = forgetPasswordController;
