const axios = require('axios');

exports.test = async (req, res, next) => { // ?† ?° ?…Œ?Š¤?Š¸ ?¼?š°?„°
  try {
    if (!req.session.jwt) { // ?„¸?…˜?— ?† ?°?´ ?—†?œ¼ë©? ?† ?° ë°œê¸‰ ?‹œ?„
      const tokenResult = await axios.post('http://localhost:8002/v1/token', {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data?.code === 200) { // ?† ?° ë°œê¸‰ ?„±ê³?
        req.session.jwt = tokenResult.data.token; // ?„¸?…˜?— ?† ?° ????ž¥
      } else { // ?† ?° ë°œê¸‰ ?‹¤?Œ¨
        return res.json(tokenResult.data); // ë°œê¸‰ ?‹¤?Œ¨ ?‚¬?œ  ?‘?‹µ
      }
    }
    // ë°œê¸‰ë°›ì?? ?† ?° ?…Œ?Š¤?Š¸
    const result = await axios.get('http://localhost:8002/v1/test', {
      headers: { authorization: req.session.jwt },
    });
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    if (error.response?.status === 419) { // ?† ?° ë§Œë£Œ ?‹œ
      return res.json(error.response.data);
    }
    return next(error);
  }
};

const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt = tokenResult.data.token;
    }
    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt },
    });
  } catch (error) {
    if (error.response?.status === 419) {
      delete req.session.jwt;
      return request(req, api);
    }
    throw error;
  }
};


exports.getMyPosts = async (req, res, next) => {
  try {
    const result = await request(req, '/posts/my');
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.searchByHashtag = async (req, res, next) => {
  try {
    const result = await request(
      req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`,
    );
    res.json(result.data);
  } catch (error) {
    if (error.code) {
      console.error(error);
      next(error);
    }
  }
};