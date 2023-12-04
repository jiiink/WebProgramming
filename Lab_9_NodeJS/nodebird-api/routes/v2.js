const express = require('express');

const { verifyToken , apiLimiter, premiumApiLimiter} = require('../middlewares');
const { createToken, tokenTest, getMyPosts, getPostsByHashtag, getFollow, limitApi } = require('../controllers/v2');

const router = express.Router();

router.use(limitApi);

// POST /v1/token
router.post('/token', createToken);

// POST /v1/test
router.get('/test', verifyToken, tokenTest);


router.get('/posts/my', verifyToken, getMyPosts);

router.get('/posts/hashtag/:title', verifyToken, getPostsByHashtag);

router.get('/follow', verifyToken, getFollow);

module.exports = router;
