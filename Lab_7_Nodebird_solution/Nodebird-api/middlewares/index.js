const { default: rateLimit } = require('express-rate-limit');
const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('ë¡œê·¸?¸ ?•„?š”');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('ë¡œê·¸?¸?•œ ?ƒ?ƒœ?ž…?‹ˆ?‹¤.');
    res.redirect(`/?error=${message}`);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    res.locals.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') { // ?œ ?š¨ê¸°ê°„ ì´ˆê³¼
      return res.status(419).json({
        code: 419,
        message: '?† ?°?´ ë§Œë£Œ?˜?—ˆ?Šµ?‹ˆ?‹¤',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '?œ ?š¨?•˜ì§? ?•Š??? ?† ?°?ž…?‹ˆ?‹¤',
    });
  }
};


exports.apiLimiter = rateLimit({
  windowMS: 60 * 1000,
  max: 1,
  handler(req, res) {
    res.status(this.statusCode).json({
      code: this.statusCode,
      message: 'can try once in a minute',
    });
  },
});

exports.deprecated = (req, res) => {
  res.status(410).json({
    code: 410,
    message: 'New version released. Use the new version.',
  });
};