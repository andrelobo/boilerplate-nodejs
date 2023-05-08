const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



const cors = require('cors');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

router.use(cors(corsOptions));


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', userController.getUsers);

module.exports = router;
