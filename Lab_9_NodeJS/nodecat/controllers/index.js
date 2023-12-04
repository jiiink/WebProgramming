const axios = require('axios');

const URL = process.env.API_URL;
axios.defaults.headers.origin = process.env.ORIGIN; // origin ?—¤?” ì¶”ê??

const request = async (req, api) => {
  try {
    if (!req.session.jwt) { // ?„¸?…˜?— ?† ?°?´ ?—†?œ¼ë©?
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt = tokenResult.data.token; // ?„¸?…˜?— ?† ?° ????ž¥
    }
    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt },
    }); // API ?š”ì²?
  } catch (error) {
    if (error.response?.status === 419) { // ?† ?° ë§Œë£Œ?‹œ ?† ?° ?ž¬ë°œê¸‰ ë°›ê¸°
      delete req.session.jwt;
      return request(req, api);
    } // 419 ?™¸?˜ ?‹¤ë¥? ?—?Ÿ¬ë©?
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

exports.test = async (req, res, next) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post('http://localhost:8002/v2/token', {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data?.code === 200) {
        req.session.jwt = tokenResult.data.token;
      } else {
        return res.json(tokenResult.data);
      }
    }
    const result = await axios.get('http://localhost:8002/v2/test', {
      headers: { authorization: req.session.jwt },
    });
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    if (error.response?.status === 419) {
      return res.json(error.response.data);
    }
    return next(error);
  }
};

exports.getFollow = async (req, res, next) => {
  try {
      const result = await request(req, '/follow');
      return res.json(result.data);
  } catch (error) {
      if (error.code) {
          console.error(error);
          next(error);
      }
  }
};