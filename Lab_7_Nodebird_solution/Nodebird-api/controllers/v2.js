const jwt = require('jsonwebtoken');
const { Domain, User, Post, Hashtag } = require('../models');

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
        message: '?“±ë¡ë˜ì§? ?•Š??? ?„ë©”ì¸?…?‹ˆ?‹¤. ë¨¼ì?? ?„ë©”ì¸?„ ?“±ë¡í•˜?„¸?š”',
      });
    }
    const token = jwt.sign({
      id: domain.User.id,
      nick: domain.User.nick,
    }, process.env.JWT_SECRET, {
      expiresIn: '1m', // 1ë¶?
      issuer: 'nodebird',
    });
    return res.json({
      code: 200,
      message: '?† ?°?´ ë°œê¸‰?˜?—ˆ?Šµ?‹ˆ?‹¤',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '?„œë²? ?—?Ÿ¬',
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
        message: '?„œë²? ?—?Ÿ¬',
      });
    });
};

exports.getPostsByHashtag = async (req, res) => {
  try {
    const hashtag = await Hashtag.findOne({ where: { title: req.params.title } });
    if (!hashtag) {
      return res.status(404).json({
        code: 404,
        message: 'ê²??ƒ‰ ê²°ê³¼ê°? ?—†?Šµ?‹ˆ?‹¤',
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
      message: '?„œë²? ?—?Ÿ¬',
    });
  }
};
