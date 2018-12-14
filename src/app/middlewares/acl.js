const User = require('../models/User');

module.exports = async (req, res, next) => {
  if (!req.userId) return res.status(403).send({ error: 'Not user login!' });

  const user = await User.findById(req.userId);

  const { role } = user;

  if(role === 'admin')
    return next();

  return res.status(403).send({ error: 'User without permission!' })
}
