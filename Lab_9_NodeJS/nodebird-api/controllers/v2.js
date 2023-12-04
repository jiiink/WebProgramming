const jwt = require('jsonwebtoken');
const url = require('url');
const { Domain, User, Post, Hashtag } = require('../models');
const { follow } = require('../../../nodebird/controllers/user');
const { Sequelize } = require('sequelize');
const { premiumApiLimiter, apiLimiter } = require('../middlewares');

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
        message: '?��록되�? ?��??? ?��메인?��?��?��. 먼�?? ?��메인?�� ?��록하?��?��',
      });
    }
    const token = jwt.sign({
      id: domain.User.id,
      nick: domain.User.nick,
    }, process.env.JWT_SECRET, {
      expiresIn: '1m', // 1�?
      issuer: 'nodebird',
    });
    return res.json({
      code: 200,
      message: '?��?��?�� 발급?��?��?��?��?��',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '?���? ?��?��',
    });
  }
};

exports.tokenTest = (req, res) => {
  res.json(res.locals.decoded);
};

exports.getMyPosts = (req, res) => {
  Post.findAll({ where: { userId: res.locals.decoded.id } })
    .then((posts) => {
      console.log(posts);
      res.json({
        code: 200,
        payload: posts,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: '?���? ?��?��',
      });
    });
};

exports.getPostsByHashtag = async (req, res) => {
  try {
    const hashtag = await Hashtag.findOne({ where: { title: req.params.title } });
    if (!hashtag) {
      return res.status(404).json({
        code: 404,
        message: '�??�� 결과�? ?��?��?��?��',
      });
    }
    const posts = await hashtag.getPosts();
    return res.json({
      code: 200,
      payload: posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '?���? ?��?��',
    });
  }
};


exports.getFollow = async (req, res) => { // when get, get the following and follower
  try {
      const user = await User.findOne({ where: { id: res.locals.decoded.id } });
      const follower = await user.getFollowers();
      const following = await user.getFollowings();
      return res.json({
          code: 200,
          follower,
          following,
      })
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          code: 500,
          message: 'server error',
      });
  }
};

exports.limitApi = async (req, res, next) => {
  const domain = await Domain.findOne({
    where: {host: url.parse(req.get('origin')).host},
  });
  if (domain.type === 'premium') {
    premiumApiLimiter(req, res, next);
  } else {
    apiLimiter(req, res, next);
  }
};
