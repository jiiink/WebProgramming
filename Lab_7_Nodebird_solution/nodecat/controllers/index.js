const axios = require('axios');

exports.test = async (req, res, next) => { // ? ?° ??€?Έ ?Ό?°?°
  try {
    if (!req.session.jwt) { // ?Έ?? ? ?°?΄ ??Όλ©? ? ?° λ°κΈ ??
      const tokenResult = await axios.post('http://localhost:8002/v1/token', {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data?.code === 200) { // ? ?° λ°κΈ ?±κ³?
        req.session.jwt = tokenResult.data.token; // ?Έ?? ? ?° ????₯
      } else { // ? ?° λ°κΈ ?€?¨
        return res.json(tokenResult.data); // λ°κΈ ?€?¨ ?¬?  ??΅
      }
    }
    // λ°κΈλ°μ?? ? ?° ??€?Έ
    const result = await axios.get('http://localhost:8002/v1/test', {
      headers: { authorization: req.session.jwt },
    });
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    if (error.response?.status === 419) { // ? ?° λ§λ£ ?
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