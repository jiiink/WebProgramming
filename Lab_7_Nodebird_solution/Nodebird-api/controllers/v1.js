const jwt = require('jsonwebtoken');
const { Domain, User } = require('../models');

exports.createToken = async (req, res) => {
  const { clientSecret } = req.body;
  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: {
        model: User,
        attribute: ['nick', 'id'],
      },
    });
    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: 'Not registered domain. Register domain',
      });
    }
    const token = jwt.sign({
      id: domain.User.id,
      nick: domain.User.nick,
    }, process.env.JWT_SECRET, {
      expiresIn: '1m',
      issuer: 'nodebird',
    });
    return res.json({
      code: 200,
      message: 'token created',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'server error',
    });
  }
};

exports.tokenTest = (req, res) => {
  res.json(res.locals.decoded);
};