const express = require('express');
const authMiddleware = require('../middlewares/auth');

const User = require('../models/User');

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {

  res.send({ id: req.userId });
})

module.exports = app => app.use('/projects', router);
