const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();
const nodemailer = require('nodemailer');



exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send a welcome email to the user
    await sendWelcomeEmail(email, name);

    res.status(201).json({
      status: 'success',
      data: {
        user
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error })
  };
};

async function sendWelcomeEmail(email, name) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: 'xonga73@gmail.com',
      pass: '####'
    }
  });

  let mailOptions = {
    from: 'SysCam <xonga73@gmail.com>',
    to: email,
    subject: 'Bem vindo ao SysCam ',
    text: `Obrigado por ser registrar como usuário ${name}!`
  };

  await transporter.sendMail(mailOptions);
}


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ message: 'Invalid email or password' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};


